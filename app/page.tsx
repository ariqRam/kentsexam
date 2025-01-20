"use client";

import { useEffect, useState } from "react";
import IsCorrect from "./components/isCorrect";

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
	const textfull: string = "The winter of January 1800 was cold in France. On January 9, out of the forest came a boy, naked, hungry, and unable to speak human language. He appeared to be about 12 years old. He moved like a wild animal, ate like a wolf, and was not toilet-trained.\
Had he been raised by wolves? He couldn't say, and no one else knew. People thought he had probably been given up for dead after getting lost. He had adapted to his surroundings in the forest, but he was unclean, unclothed, and totally isolated from all other humans.\
Scientists took him to Paris for observation. This boy, given the name Victor, seemed to be an ideal subject to study what a human being is like in a natural state. They tried to teach him language, table manners, and literacy. But he learned only a little, and it was very difficult for him. He was more interested in food than in any other thing. He was taught by the best teachers, but his development was very slow. It remained impossible for him to utter meaningful sounds. However, through the loving care of a woman, he gradually began to show his feelings. He came to feel attached to this caregiver. This helped him show some improvement in his training. He became able to understand some things that people said and wrote. He understood what he was asked to do and did it perfectly.\
What does Victor's case tell us? The fact that he had difficulty learning to speak suggests that there is a *critical period for learning language. It is said that children have a \"language-learning device\" in their brains. With this device, they learn to speak and acquire literacy. It is believed that this language-learning device gradually disappears if it is not used when the child is young.\
This device, however, does not stand alone. Language development takes place in close relation with mental growth in a social environment. By interacting with your community members, your language-learning device works more actively. Victor's case also shows us that emotions are an important factor for mental development. The various kinds of emotions you feel for the people around you encourage your mental development. Having and expressing your feelings is just a part of learning to be a human being. And this is an advantage that Victor never had.";
	const transfull: string = "1800年の1月の冬、フランスは寒かった。1月9日、森から現れたのは、裸で、空腹で、人間の言葉を話せない1人の少年だった。彼は12歳くらいに見えた。彼は野生動物のように動き、オオカミのように食べ、トイレのしつけができていなかった。\
	彼はオオカミに育てられたのだろうか？彼は（それを）語ることができず、他の誰にもわからなかった。彼はおそらく迷子になった後、死んだものとあきらめられたのだろうと、人々は考えた。彼は森の環境に適応していたが、不潔で、服を着ておらず、他のすべての人間から完全に隔離されていた。\
	科学者たちは、観察のために彼をパリへ連れて行った。この少年は、ビクターと名付けられ、人類が自然の状態でどのようであるかを研究するのに格好の対象のように思われた。彼らは、彼に言語、テーブルマナー、そして読み書きを教えようとした。しかし、彼はほんの少ししか身につけられず、それらを学ぶことは彼にはとても難しいことであった。彼は他のどんなことよりも食べ物に関心を示した。彼は最も優秀な教師たちに教えられたが、彼の発達は非常に遅かった。彼が意味のある音を発するのは、不可能なままだった。しかしながら、ある女性の愛情に満ちた世話を通じて、彼は次第に感情を表すようになった。彼はこの養育係に愛着を感じるようになった。このおかげで、彼は訓練においていくぶんかの進歩を示すようになった。彼は、人々が言うことや書くことを少し理解できるようになった。彼は、するように求められていることを理解し、完璧にそれを行った。\
	ビクターの例が私たちに教えてくれることは何なのだろう？彼が話せるようになるのが困難だったという事実は、言語を学ぶには臨界期（その時期を過ぎるとその後学習が上達しなくなる限界の時期）があることを示している。子どもは脳の中に、「言語習得装置」を持っていると言われる。この装置により、彼らは話せるようになったり、読み書きを習得したりする。この言語習得装置は、子どもが幼い時に使われないと次第に消滅するとじられている。\
	しかしながら、この装置は、単独で機能するのではない。言語の発達は、社会的な環境における心の成長と密接な関係のもとで起こるのである。地域社会の人々と交流することにより，言語習得装置はより活発に働く。ビクターの事例は、また、感情が精神的発達のために重要な要素であることをも示している。周りの人々に対して感じる様々な感情が、精神的発達を促進する。自分の感情を持ち、それを表現することは、まさに人間になるための学習の一部である。そして、これこそ、ビクターが決して持つことがなかった （人間の） すぐれた点なのである。";

	const [questions, setQuestions] = useState<Question[]>([]);
	const [isCorrects, setIsCorrects] = useState<boolean[]>([]);
	const [show, setShow] = useState<boolean>();

	useEffect(() => {
		setShow(false);
		setQuestions(generateQuestions(textfull, transfull));
	}, []);

	function handleShowButton() {
		if (show) window.location.reload();
		const isCorrects: boolean[] = [];
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
			{questions.map((q) => (
				<div key={q.qid} className="p-5">
					<p className="text-3xl">
						{q.qid + 1}. {q.foreword}
						<span>
							<input className="mx-2 px-2 rounded bg-slate-500" style={{ width: `${Math.max(q.response.length * 18, 100)}px` }} type="text" value={q.response} onChange={(e) => handleQuestionInput(e.target.value, q.qid)} />
						</span>
						{q.afterword}
					</p>
					<p className=" text-gray-500 text-3xl pl-8">{q.transSentence}</p>
				</div>
			))}
			<div className=" text-center">

				<button className="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleShowButton}>{show ? "再生成" : "結果を見る"}</button>
			</div>
			{show && <IsCorrect isCorrects={isCorrects} />}

		</div>
	);
}
