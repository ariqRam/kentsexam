export default function IsCorrect({ isCorrects, goToQuestion }: { isCorrects: boolean[], goToQuestion: (index: number) => void }) {
	return (
		<div className="grid grid-cols-12 gap-4" >
			{
				isCorrects.map((isCorrect: boolean, index: number) => (

					isCorrect ?
						<div key={index} onClick={() => goToQuestion(index)} className="col-span-3 md:col-span-4 p-3 text-center font-bold text-xl cursor-pointer rounded bg-teal-400">{index + 1}</div> :
						<div key={index} onClick={() => goToQuestion(index)} className="col-span-3 md:col-span-4 p-3 text-center font-bold text-xl cursor-pointer rounded bg-red-400">{index + 1}</div>

				))
			}
		</div >
	)
}