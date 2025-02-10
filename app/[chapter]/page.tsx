"use client";

import IsCorrect from "../components/isCorrect";

import { useEffect, useState, useRef } from "react";
import { useParams } from 'next/navigation'

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
	const params = useParams<{ chapter: string }>();
	const chapter: string = params.chapter;
	// const textfull: string = "Children, like adults, have different personalities. Their interests may be similar, but the way children deal with these interests and interact with others shows their personality types. Experts have researched this phenomenon and classified children into three different types: \"flexible,\" \"fearful,\" and \"feisty.\" The first personality type is called flexible. It is the most common of the three types with roughly half of all children falling into this group. These children react mildly when they feel angry or disappointed. Thus, flexible children are quite easy to take care of. They usually adapt to new situations and activities quickly, and are generally cheerful. Flexible children do not yell or make demands loudly, but slowly and politely let their caregiver know about their needs. Even when they do not get attention right away, they seldom *make a fuss. They patiently wait. They are flexible to any change. The next is the fearful type. About 30 percent of children are of this type. They are shy and quiet, and take longer than flexible children to adapt to new environments. In a new environment, fearful children often keep *clinging to someone or something familiar until they feel comfortable with the new situation. Consequently, they feel deeply attached to the caregiver or object. Fearful children may also hold back when other children are eagerly jumping into a new situation. These children may prefer to play alone rather than with a group. The third type is called feisty. About 20 percent of children fit into this group. Feisty children express their opinions in a very strong way. Whether they are happy or sad, everyone around them will know how they feel. These children remain active most of the time, which makes them seem very aggressive. If there is something they particularly want, feisty children often go on crying until they get it. Unlike flexible children, they do not adapt to changes easily. Once they get used to things, they won't give them up. Generally speaking, children can be divided into these three groups, but caregivers must not forget that each child is an individual. Children have to be treated according to their individual needs. However, being aware of these general personality types can help a caregiver determine the best way to react and help a child."
	const [textfull, setTextfull] = useState("Loading...");

	// 	const textfull: string = "The winter of January 1800 was cold in France. On January 9, out of the forest came a boy, naked, hungry, and unable to speak human language. He appeared to be about 12 years old. He moved like a wild animal, ate like a wolf, and was not toilet-trained.\
	// Had he been raised by wolves? He couldn't say, and no one else knew. People thought he had probably been given up for dead after getting lost. He had adapted to his surroundings in the forest, but he was unclean, unclothed, and totally isolated from all other humans.\
	// Scientists took him to Paris for observation. This boy, given the name Victor, seemed to be an ideal subject to study what a human being is like in a natural state. They tried to teach him language, table manners, and literacy. But he learned only a little, and it was very difficult for him. He was more interested in food than in any other thing. He was taught by the best teachers, but his development was very slow. It remained impossible for him to utter meaningful sounds. However, through the loving care of a woman, he gradually began to show his feelings. He came to feel attached to this caregiver. This helped him show some improvement in his training. He became able to understand some things that people said and wrote. He understood what he was asked to do and did it perfectly.\
	// What does Victor's case tell us? The fact that he had difficulty learning to speak suggests that there is a *critical period for learning language. It is said that children have a \"language-learning device\" in their brains. With this device, they learn to speak and acquire literacy. It is believed that this language-learning device gradually disappears if it is not used when the child is young.\
	// This device, however, does not stand alone. Language development takes place in close relation with mental growth in a social environment. By interacting with your community members, your language-learning device works more actively. Victor's case also shows us that emotions are an important factor for mental development. The various kinds of emotions you feel for the people around you encourage your mental development. Having and expressing your feelings is just a part of learning to be a human being. And this is an advantage that Victor never had.";

	// const transfull: string = "子どもは大人と同じように、様々な性格を持つ。彼らが興味を持つ物事は似ているかもしれないが、興味のある事への対応の仕方や人との関わり方によって、彼らの性格のタイプがわかる。専門家は、この現象を調査して、子どもたちを「柔軟型」「脂病型」「攻撃型」の3つの異なるタイプに分類した。性格の最初のタイプは柔軟型と呼ばれる。これは、3つのタイプのうちでもっともよくあるもので、おおよそ半数の子どもがこのグループに分類される。この子どもたちは、怒りを感じている時や失望している時でも穏やかに反応する。そのため、柔軟 型の子どもたちは大変世話がしやすい。彼らはたいてい、新しい状況や活動にすぐさま順応し，概して陽気である。柔軟型の子どもたちは、叫んだり、大声で要求したりせず、保育者にゆっくりと丁寧に自分の要求を伝える。すぐに注目してもらえない時でも，騒ぎたてることはめったにない。彼らは辛抱強く待つ。彼らはいかなる変化に対しても柔軟である。次のタイプは臆病型である。約30パーセントの子どもたちがこのタイプである。 彼らは内気で物静かで、新しい環境に順応するのに、柔軟型の子どもたちより時間がかかる。新しい環境の中では、臆病型の子どもたちは、その新しい状況で居心地がよくなるまで，しばしば慣れ親しんだ人や物にくっついて離れない。そのため、彼らは保育者や物に対して、深い愛着を感じる。臆病型の子どもたちはまた、他の子どもたちが熱心に新しい状況に飛び込んでいる時でも、ちゅうちょすることがある。このような子どもたちは、集団よりも1人で遊ぶことを好むようである。3番目のタイプは攻撃型と呼ばれる。約20パーセントの子どもたちがこのグループに当てはまる。攻撃型の子どもたちは、自分の意見を非常に強硬なやり方で表現する。 その子たちが嬉しくても悲しくても、周りのすべての人には、彼らがどう感じているかわかるものである。このような子どもたちは、たいていの場合、活動的であり続け。そのため、彼らはとても攻撃的に思える。もし特にほしいものがあれば、攻撃型の子どもたちはそれを手に入れるまで泣き続けることがよくある。柔軟型の子どもたちと違って、彼らは簡単に変化に順応しない。彼らはいったん物事に慣れると、決して手放そうとしない。一般的に言って、子どもたちはこの3つのグループに分けられるが、保育者は、それぞれの子どもは個人であるということを忘れてはならない。子どもたちは、個々の要求に応じて扱われなければならない。しかしながら、この一般的な性格のタイプを知っておくことにより、保育者が一番良い対処法や子どもへの手助けの仕方を決めるのに役立つことがあるだろう。"
	const [transfull, setTransfull] = useState("Loading...");

	// const transfull: string = "1800年の1月の冬、フランスは寒かった。1月9日、森から現れたのは、裸で、空腹で、人間の言葉を話せない1人の少年だった。彼は12歳くらいに見えた。彼は野生動物のように動き、オオカミのように食べ、トイレのしつけができていなかった。\
	// 彼はオオカミに育てられたのだろうか？彼は（それを）語ることができず、他の誰にもわからなかった。彼はおそらく迷子になった後、死んだものとあきらめられたのだろうと、人々は考えた。彼は森の環境に適応していたが、不潔で、服を着ておらず、他のすべての人間から完全に隔離されていた。\
	// 科学者たちは、観察のために彼をパリへ連れて行った。この少年は、ビクターと名付けられ、人類が自然の状態でどのようであるかを研究するのに格好の対象のように思われた。彼らは、彼に言語、テーブルマナー、そして読み書きを教えようとした。しかし、彼はほんの少ししか身につけられず、それらを学ぶことは彼にはとても難しいことであった。彼は他のどんなことよりも食べ物に関心を示した。彼は最も優秀な教師たちに教えられたが、彼の発達は非常に遅かった。彼が意味のある音を発するのは、不可能なままだった。しかしながら、ある女性の愛情に満ちた世話を通じて、彼は次第に感情を表すようになった。彼はこの養育係に愛着を感じるようになった。このおかげで、彼は訓練においていくぶんかの進歩を示すようになった。彼は、人々が言うことや書くことを少し理解できるようになった。彼は、するように求められていることを理解し、完璧にそれを行った。\
	// ビクターの例が私たちに教えてくれることは何なのだろう？彼が話せるようになるのが困難だったという事実は、言語を学ぶには臨界期（その時期を過ぎるとその後学習が上達しなくなる限界の時期）があることを示している。子どもは脳の中に、「言語習得装置」を持っていると言われる。この装置により、彼らは話せるようになったり、読み書きを習得したりする。この言語習得装置は、子どもが幼い時に使われないと次第に消滅するとじられている。\
	// しかしながら、この装置は、単独で機能するのではない。言語の発達は、社会的な環境における心の成長と密接な関係のもとで起こるのである。地域社会の人々と交流することにより，言語習得装置はより活発に働く。ビクターの事例は、また、感情が精神的発達のために重要な要素であることをも示している。周りの人々に対して感じる様々な感情が、精神的発達を促進する。自分の感情を持ち、それを表現することは、まさに人間になるための学習の一部である。そして、これこそ、ビクターが決して持つことがなかった （人間の） すぐれた点なのである。";


	const [questions, setQuestions] = useState<Question[]>([]);
	const [isCorrects, setIsCorrects] = useState<boolean[]>([]);
	const [show, setShow] = useState<boolean>();
	const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
				const res = await fetch(`/${chapter}.txt`);
				const text = await res.text();
				setTextfull(text.split("\n")[0].trim());
				setTransfull(text.split("\n")[1].trim())
				console.log(text);
			} catch (error) {
				setTextfull(`Error: File not found. ${error}`);
			}
		}

		fetchText();
	}, [chapter, textfull, transfull]);

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
			{questions.map((q, index) => (
				<div key={q.qid} className="p-5" ref={(el) => (questionRefs.current[index] = el)}>
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
