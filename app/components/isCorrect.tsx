export default function IsCorrect({ isCorrects }: { isCorrects: boolean[] }) {
	return (
		<div className="grid grid-cols-12 gap-4" >
			{
				isCorrects.map((isCorrect: boolean, index: number) => (

					isCorrect ?
						<div key={index} className="col-span-3 md:col-span-4 p-3 text-center font-bold text-xl rounded bg-teal-400">{index + 1}</div> :
						<div key={index} className="col-span-3 md:col-span-4 p-3 text-center font-bold text-xl rounded bg-red-400">{index + 1}</div>

				))
			}
		</div >
	)
}