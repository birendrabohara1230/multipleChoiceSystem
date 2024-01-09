import axios from "axios"
import { useEffect, useState } from "react"
import dayjs from "dayjs";

export default function Question() {
    const [questions, setQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitClicked, setSubmitClicked] = useState(false);
    let counter = 1;
    let valueForOptions = 0;

    try {
        useEffect(() => {
            const today = dayjs()
            const testStartsTime = today.format('dddd, MMMM, YYYY, hh:mm:ss A')
            axios.get("http://localhost:3000/questions/all/4")
                .then(function (response) {
                    setQuestions(response.data.questionsWithOutAns)
                })
        }, [])

    } catch (error) {
        console.log(error);
    }

    function handleChange(e, questionId) {
        const selectedOption = e.target.value;
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption,
        }));
    }

    async function handleClick() {
        setSubmitClicked(true);
        try {
            const today = dayjs()
            const testEndsTime = today.format('dddd, MMMM, YYYY, hh:mm:ss A')
            const response = await axios.post("http://localhost:3000/questions/submittedAns", {
                selectedAnswers,
                testStartsTime,
                testEndsTime,
                username: 'ramu'
            })
            alert(`Obtained Score is ${response.data.obtainedScore}`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex justify-center shadow-lg">
            <div className="flex  p-10 flex-col">
                {
                    questions.map((question, index) => (
                        <div key={index} id={question._id} className="text-white m-2">
                            <div className="flex gap-2 font-bold">
                                <div className="text-green-800">{counter++}.</div>
                                <div>{question.qns}</div>
                            </div>
                            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-1">
                                {
                                    question.opt.map((option, index) => (
                                        <div key={index} className="">
                                            <input type="radio" name={question._id} id={valueForOptions}
                                                className="cursor-pointer"
                                                value={option}
                                                onChange={(e) => handleChange(e, question._id)}
                                                disabled={submitClicked} // Disable when submitClicked is true
                                            />
                                            <label className="ml-2 cursor-pointer" htmlFor={valueForOptions++}>{option}</label>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
                <button
                    className="text-white bg-blue-950 w-40 p-3 rounded-lg hover:bg-blue-800"
                    onClick={handleClick}
                    disabled={submitClicked}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}