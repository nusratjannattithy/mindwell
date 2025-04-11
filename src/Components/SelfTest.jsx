/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { TbNumber0Small } from 'react-icons/tb';
import { Link } from 'react-router-dom';
// import useAxios from './hooks/useAxios';
import { all } from 'axios';

const SelfTest = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [testType, setTestType] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  // const axios = useAxios()

  const handleConsent = () => {
    setConsentGiven(true);
  };

  const handleTestSelection = (test) => {
    setTestType(test);
  };

  const handleAnswerChange = (e, questionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = e.target.value;
    setAnswers(newAnswers);
  };
  //depression test button
  const handleSubmitTest = (e) => {
    e.preventDefault();
    const hope = e.target.hope.value;
    const interest = e.target.interest.value;
    const sleep = e.target.sleep.value;
    const energy = e.target.energy.value;
    const concentration = e.target.concentration.value;
  
    const allInputField = {
      hope,interest,sleep,energy,concentration

    }
    console.log(allInputField)
    // axios.post("/questions",allInputField).then((res)=>{
    //   if(res.data.insertedID){
    //     console.log("data posted successfully")
    //   }
    // })
    fetch("http://localhost:5173/questions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allInputField),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
         console.log("data posted successfully");
        }
      });
   
  };
  //stress test button functionality
  const handleStressTest = (e) => {
    e.preventDefault();
    
    const overwhelmed = e.target.overwhelmed.value;
    const irritated = e.target.irritated.value;
    const relaxing = e.target.relaxing.value;
    const fatigued = e.target.fatigued.value;
    // const bipolar = e.target.bipolar.value;
    // const trouble = e.target.trouble.value;
    // const feel = e.target.feel.value;
    // const mood = e.target.mood.value;
    // const risky = e.target.risky.value;
    // const flashbacks = e.target.flashbacks.value;
    // const avoidance = e.target.avoidance.value;
    // const numbness = e.target.numbness.value;
    // const experience = e.target.experience.value;
    // const startle = e.target.startle.value;
    const allInputField = {
     overwhelmed,irritated,relaxing,fatigued

    }
    console.log(allInputField)
   
  };
  const handleBipolarTest = (e) => {
    e.preventDefault();
    
    const bipolar = e.target.bipolar.value;
    const trouble = e.target.trouble.value;
    const feel = e.target.feel.value;
    const mood = e.target.mood.value;
    const risky = e.target.risky.value;
    // const flashbacks = e.target.flashbacks.value;
    // const avoidance = e.target.avoidance.value;
    // const numbness = e.target.numbness.value;
    // const experience = e.target.experience.value;
    // const startle = e.target.startle.value;
    const allInputField = {
     bipolar,trouble,feel,mood,risky
    }
    console.log(allInputField)
   
  };
  const handleTraumaTest = (e) => {
    e.preventDefault();
    
    const flashbacks = e.target.flashbacks.value;
    const avoidance = e.target.avoidance.value;
    const numbness = e.target.numbness.value;
    const experience = e.target.experience.value;
    const startle = e.target.startle.value;
    const allInputField = {
    flashbacks,avoidance,numbness,experience,startle

    }
    console.log(allInputField)
   
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Mental Health Self-Assessment</h1>

      {!consentGiven ? (
        <div className="mb-6">
          <p>Please provide consent to take the test.</p>
          <button
            onClick={handleConsent}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            I Consent
          </button>
        </div>
      ) : (
        <>
          {!testType ? (
            <div className="space-y-4">
              <button onClick={() => handleTestSelection('depression')} className="bg-green-500 text-white py-2 px-4 rounded">
                Depression Test
              </button>
              <button onClick={() => handleTestSelection('stress')} className="bg-yellow-500 text-white py-2 px-4 rounded">
                Stress Test
              </button>
              <button onClick={() => handleTestSelection('bipolar')} className="bg-blue-500 text-white py-2 px-4 rounded">
                Bipolar Test
              </button>
              <button onClick={() => handleTestSelection('trauma')} className="bg-red-500 text-white py-2 px-4 rounded">
                Trauma Test
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  {testType.charAt(0).toUpperCase() + testType.slice(1)} Test
                </h2>
                <form onSubmit={handleSubmitTest}>
                  {testType === 'depression' && (
                    <div className="space-y-4">
                      <label className="block">
                        <span>1. Have you been feeling hopeless or sad?</span>
                        <select
                        name="hope"
                          onChange={(e) => handleAnswerChange(e, 0)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>2. Have you lost interest in activities you once enjoyed?</span>
                        <select
                        name="interest"
                          onChange={(e) => handleAnswerChange(e, 1)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>3. Do you have trouble sleeping or sleeping too much?</span>
                        <select
                        name="sleep"
                          onChange={(e) => handleAnswerChange(e, 2)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>4. Do you feel tired or have low energy almost every day?</span>
                        <select
                        name="energy"
                          onChange={(e) => handleAnswerChange(e, 3)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>5. Do you have trouble concentrating or making decisions?</span>
                        <select
                        name="concentration"
                          onChange={(e) => handleAnswerChange(e, 4)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                    </div>
                  )}
                  <button className='btn bg-red-500 w-10 h-10 mt-6'>click</button>
                  </form>
                   
                  <form onSubmit={handleStressTest}>
                  {testType === 'stress' && (
                    <div className="space-y-4">
                      <label className="block">
                        <span>1. Do you feel overwhelmed by daily tasks?</span>
                        <select
                        name="overwhelmed"
                          onChange={(e) => handleAnswerChange(e, 0)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>2. Do you feel irritable or easily angered?</span>
                        <select
                        name="irritated"
                          onChange={(e) => handleAnswerChange(e, 1)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>3. Do you have trouble relaxing or winding down?</span>
                        <select
                        name="relaxing"
                          onChange={(e) => handleAnswerChange(e, 2)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>4. Do you feel fatigued or have low energy?</span>
                        <select
                        name="fatigued"
                          onChange={(e) => handleAnswerChange(e, 3)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                    </div>
                  )}
                   <button className='btn bg-green-500 w-10 h-10 mt-6'>click1</button>
                   </form>
                   
                   
                  <form onSubmit={handleBipolarTest}>
                  {testType === 'bipolar' && (
                    <div className="space-y-4">
                      <label className="block">
                        <span>1. Do you experience periods of extreme highs (mania) and lows (depression)?</span>
                        <select
                        name="bipolar"
                          onChange={(e) => handleAnswerChange(e, 0)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>2. Do you have trouble sleeping during manic episodes?</span>
                        <select
                        name="trouble"
                          onChange={(e) => handleAnswerChange(e, 1)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>3. Do you feel unusually energetic or restless during manic episodes?</span>
                        <select
                        name="feel"
                        onChange={(e) => handleAnswerChange(e, 2)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>4. Do you experience rapid mood swings?</span>
                        <select
                        name="mood"
                          onChange={(e) => handleAnswerChange(e, 3)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>5. Do you engage in risky behaviors during manic episodes?</span>
                        <select
                        name="risky"
                          onChange={(e) => handleAnswerChange(e, 4)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                    </div>
                  )}
                   <button className='btn bg-red-500 w-10 h-10 mt-6'>click</button>
                  </form> 
                  <form onSubmit={handleTraumaTest}>
                  {testType === 'trauma' && (
                    <div className="space-y-4">
                      <label className="block">
                        <span>1. Do you have flashbacks or intrusive memories of a traumatic event?</span>
                        <select
                        name="flashbacks"
                          onChange={(e) => handleAnswerChange(e, 0)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>2. Do you avoid situations or places that remind you of the traumatic event?</span>
                        <select
                        name="avoidance"
                        onChange={(e) => handleAnswerChange(e, 1)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>3. Do you feel emotionally numb or detached from others?</span>
                        <select
                        name="numbness"
                          onChange={(e) => handleAnswerChange(e, 2)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>4. Do you have trouble sleeping or experience nightmares?</span>
                        <select
                        name="experience"
                          onChange={(e) => handleAnswerChange(e, 3)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                      <label className="block">
                        <span>5. Do you feel easily startled or on edge?</span>
                        <select
                        name="startle"
                          onChange={(e) => handleAnswerChange(e, 4)}
                          className="mt-2 border p-2 rounded"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </label>
                    </div>
                  )}
                    <button className='btn bg-red-500 w-10 h-10 mt-6'>click</button>
                   </form>
                  <button
                    type="button"
                   
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Submit Test
                  </button>
               
              </div>

              {result && (
                <div className="mt-6 p-4 bg-gray-100 border rounded">
                  <h3 className="text-lg font-semibold">Test Result</h3>
                  <p>{result}</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SelfTest;
//edited for the backend
