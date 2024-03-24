import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

function App() {
	const [competitions, setCompetitions] = useState([]);
	const competitionsCollectionRef = collection(db, "competitions");

	useEffect(() => {
		const getCompetitions = async () => {
			const data = await getDocs(competitionsCollectionRef);
			setCompetitions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getCompetitions();
	}, []);

	const [newCompetition, setNewCompetition] = useState({
		name: "",
		startDate: "",
		endDate: "",
		teamName: "",
		teamMembers: "",
		completed: false,
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewCompetition({ ...newCompetition, [name]: value });
	};

	const handleDoneClick = async () => {
		await addDoc(competitionsCollectionRef, newCompetition);
		setNewCompetition({
			name: "Not Mentioned",
			startDate: "Not Mentioned",
			endDate: "Not Mentioned",
			teamName: "Not Mentioned",
			teamMembers: "Not Mentioned",
			completed: false,
		});
		const data = await getDocs(competitionsCollectionRef);
		setCompetitions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const updateCompetition = async (id, field, value) => {
		const competitionDoc = doc(db, "competitions", id);
		const newFields = { [field]: value };
		await updateDoc(competitionDoc, newFields);
	};

	const deleteCompetition = async (id) => {
		const competitionDoc = doc(db, "competitions", id);
		await deleteDoc(competitionDoc);
	};

	return (
		<>
			<h1 className='text-3xl text-center mx-auto mt-4 mb-8 font-bold'>
				Competition tracker
			</h1>

			<div className='container mx-auto p-4'>
				<div className='mb-4'>
					<input
						type='text'
						name='name'
						placeholder='Name'
						value={newCompetition.name}
						onChange={handleInputChange}
						className='border rounded px-2 py-1 mr-2'
					/>
					<input
						type='date'
						name='startDate'
						placeholder='Start Date'
						value={newCompetition.startDate}
						onChange={handleInputChange}
						className='border rounded px-2 py-1 mr-2'
					/>
					<input
						type='date'
						name='endDate'
						placeholder='End Date'
						value={newCompetition.endDate}
						onChange={handleInputChange}
						className='border rounded px-2 py-1 mr-2'
					/>
					<input
						type='text'
						name='teamName'
						placeholder='Team Name'
						value={newCompetition.teamName}
						onChange={handleInputChange}
						className='border rounded px-2 py-1 mr-2'
					/>
					<input
						type='text'
						name='teamMembers'
						placeholder='Team Members (comma separated)'
						value={newCompetition.teamMembers}
						onChange={handleInputChange}
						className='border rounded px-2 py-1 mr-2'
					/>
					<button
						onClick={handleDoneClick}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						Done
					</button>
				</div>
				<table className='table-auto border-collapse border border-gray-800 w-full'>
					<thead>
						<tr className='bg-gray-300 text-gray-700'>
							<th className='border border-gray-600 px-4 py-2'>Name</th>
							<th className='border border-gray-600 px-4 py-2'>Start Date</th>
							<th className='border border-gray-600 px-4 py-2'>End Date</th>
							<th className='border border-gray-600 px-4 py-2'>Team Name</th>
							<th className='border border-gray-600 px-4 py-2'>Team Members</th>
							<th className='border border-gray-600 px-4 py-2'>Completed</th>
							<th className='border border-gray-600 px-4 py-2'>Action</th>
						</tr>
					</thead>
					<tbody>
						{competitions.map((competition) => (
							<tr key={competition.id}>
								<td
									contentEditable={true}
									onBlur={(e) =>
										updateCompetition(
											competition.id,
											"name",
											e.target.textContent
										)
									}
									className='border border-gray-500 px-4 py-2'>
									{competition.name}
								</td>
								<td
									contentEditable={true}
									onBlur={(e) =>
										updateCompetition(
											competition.id,
											"startDate",
											e.target.textContent
										)
									}
									className='border border-gray-500 px-4 py-2'>
									{competition.startDate}
								</td>
								<td
									contentEditable={true}
									onBlur={(e) =>
										updateCompetition(
											competition.id,
											"endDate",
											e.target.textContent
										)
									}
									className='border border-gray-500 px-4 py-2'>
									{competition.endDate}
								</td>
								<td
									contentEditable={true}
									onBlur={(e) =>
										updateCompetition(
											competition.id,
											"teamName",
											e.target.textContent
										)
									}
									className='border border-gray-500 px-4 py-2'>
									{competition.teamName}
								</td>
								<td
									contentEditable={true}
									onBlur={(e) =>
										updateCompetition(
											competition.id,
											"teamMembers",
											e.target.textContent
										)
									}
									className='border border-gray-500 px-4 py-2'>
									{competition.teamMembers.split(",").map((member, index) => (
										<p
											key={index}
											className='font-bold break-words'>
											{member.trim()}
										</p>
									))}
								</td>
								<td
									contentEditable={true}
									onBlur={(e) =>
										updateCompetition(
											competition.id,
											"completed",
											e.target.textContent
										)
									}
									className='border border-gray-500 px-4 py-2'>
									{String(competition.completed)}
								</td>
								<td className='border border-gray-500 px-4 py-2'>
									<button
										onClick={() => deleteCompetition(competition.id)}
										className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}

export default App;
