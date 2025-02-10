"use client";

import IsCorrect from "../components/isCorrect";

import { useEffect, useState, useRef } from "react";
import { useParams, redirect } from 'next/navigation'

class Question {
	qid: number;
	index: number;
	response: string;
	answer: string;
	sentence: string;
	transSentence: string;
	foreword: string;
	afterword: string;

	constructor(qid: number, index: number, answer: string, sentence: string, transSentence: string) {
		this.qid = qid;
		this.index = index;
		this.response = "";
		this.answer = answer;
		this.sentence = sentence;
		this.transSentence = transSentence;

		const words: string[] = sentence.split(" ");
		this.foreword = words.splice(0, this.index).join(" ");
		this.afterword = words.splice(1, words.length).join(" ");
	}
}

function getRandomInt(max: number): number {
	return Math.floor(Math.random() * max);
}

function generateQuestions(textfull: string, transfull: string) {
	const sentences: string[] = textfull.split(/[.?]/).filter((s) => { return s.length > 0 });
	const transSentences: string[] = transfull.split(/[。？]/);

	const questions: Question[] = [];
	sentences.forEach((s, i) => {

		const words: string[] = s.split(" ");
		let randId: number = getRandomInt(words.length);

		while ((words[randId].length <= 3) || ["this", "that"].includes(words[randId]) || !isNaN(Number(words[randId]))) {
			randId = getRandomInt(words.length);
		}

		questions.push(new Question(i, randId, words[randId], s, transSentences[i]));
	})

	return questions;
}

export default function Home() {
	const params = useParams<{ chapter: string }>(); // Make chapter optional
	const chapter: string = params.chapter;

	const [textfull, setTextfull] = useState("Loading...");
	const [transfull, setTransfull] = useState("Loading...");


	const [questions, setQuestions] = useState<Question[]>([]);
	const [isCorrects, setIsCorrects] = useState<boolean[]>([]);
	const [show, setShow] = useState<boolean>();
	const questionRefs = useRef<Array<HTMLDivElement | null>>(new Array(questions.length).fill(null));

	const handleScrollToQuestion = (index: number) => {
		if (questionRefs.current[index]) {
			questionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	useEffect(() => {
		setShow(false);
		setQuestions(generateQuestions(textfull, transfull));
		if (!chapter) return;

		async function fetchText() {
			try {
				console.log("fetching...")
				// const res = await fetch(`/${chapter}.txt`);
				const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/${chapter}.txt`);
				const text = await res.text();
				setTextfull(text.split("\n")[0].trim());
				setTransfull(text.split("\n")[1].trim())
			} catch (error) {
				setTextfull(`Error: File not found. ${error}`);
			}
		}

		fetchText();
	}, [chapter, textfull, transfull]);

	function handleShowButton() {
		if (show) window.location.reload();
		questions.forEach((q) => {
			isCorrects.push(q.answer.replace(",", "") == q.response || q.answer == q.response);
		});
		setIsCorrects(isCorrects);
		setShow(true);
	}

	function handleQuestionInput(value: string, qid: number) {

		const updatedQuestions = [...questions];
		updatedQuestions[qid] = { ...updatedQuestions[qid], response: value };
		setQuestions(updatedQuestions);
	}

	return (
		<div className="p-10">
			{/* <input type="text" value={text} onChange={(e) => setText(e.target.value)} /> */}
			{questions.map((q, index) => (
				<div key={q.qid} className="p-5" ref={el => { questionRefs.current[index] = el }}>
					<p className="text-3xl">
						{q.qid + 1}. {q.foreword}
						<span>
							<input className="mx-2 px-2 rounded bg-slate-500" style={{ width: `${Math.max(q.response.length * 18, 100)}px` }} type="text" value={q.response ? q.response : q.answer[0]} onChange={(e) => handleQuestionInput(e.target.value, q.qid)} />
						</span>
						{q.afterword}
					</p>
					<p className=" text-gray-500 text-3xl pl-8">{q.transSentence}</p>
				</div>
			))}
			<div className=" text-center">

				<button className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowButton}>{show ? "再生成" : "結果を見る"}</button>
			</div>
			{show && <IsCorrect goToQuestion={handleScrollToQuestion} isCorrects={isCorrects} />}

		</div>
	);
}
