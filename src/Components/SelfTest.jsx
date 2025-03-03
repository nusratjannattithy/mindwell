import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SelfTest = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [testType, setTestType] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

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

  const handleSubmitTest = () => {
    const score = answers.filter(answer => answer === 'yes').length;
    let resultMessage = '';

    if (testType === 'depression') {
      if (score >= 5) {
        resultMessage = 'You may be experiencing severe depression. Please consult a professional immediately.';
      } else if (score >= 3) {
        resultMessage = 'You may be experiencing moderate depression. Consider seeking professional help.';
      } else if (score >= 1) {
        resultMessage = 'You may be experiencing mild depression. Keep an eye on your symptoms and consider talking to someone.';
      } else {
        resultMessage = 'You seem to be in good mental health. Keep taking care of yourself!';
      }
    } else if (testType === 'stress') {
      if (score >= 4) {
        resultMessage = 'You may be experiencing high levels of stress. Consider stress management techniques or professional help.';
      } else if (score >= 2) {
        resultMessage = 'You may be experiencing moderate stress. Try relaxation techniques and self-care.';
      } else {
        resultMessage = 'You seem to be managing stress well. Keep up the good work!';
      }
    } else if (testType === 'bipolar') {
      if (score >= 5) {
        resultMessage = 'You may be experiencing severe bipolar symptoms. Please consult a professional immediately.';
      } else if (score >= 3) {
        resultMessage = 'You may be experiencing moderate bipolar symptoms. Consider seeking professional help.';
      } else if (score >= 1) {
        resultMessage = 'You may be experiencing mild bipolar symptoms. Keep an eye on your symptoms and consider talking to someone.';
      } else {
        resultMessage = 'You seem to be in good mental health. Keep taking care of yourself!';
      }
    } else if (testType === 'trauma') {
      if (score >= 4) {
        resultMessage = 'You may be experiencing severe trauma symptoms. Please consult a professional immediately.';
      } else if (score >= 2) {
        resultMessage = 'You may be experiencing moderate trauma symptoms. Consider seeking professional help.';
      } else {
        resultMessage = 'You seem to be managing trauma well. Keep up the good work!';
      }
    }

    setResult(resultMessage);
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
                <form>
                  {testType === 'depression' && (
                    <div className="space-y-4">
                      <label className="block">
                        <span>1. Have you been feeling hopeless or sad?</span>
                        <select
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
                  {testType === 'stress' && (
                    <div className="space-y-4">
                      <label className="block">
                        <span>1. Do you feel overwhelmed by daily tasks?</span>
                        <select
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
                  {testType === 'bipolar' && (
                    <div className="space-y-4">
                      <label className="block">
                        <span>1. Do you experience periods of extreme highs (mania) and lows (depression)?</span>
                        <select
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
                  {testType === 'trauma' && (
                    <div className="space-y-4">
                      <label className="block">
                        <span>1. Do you have flashbacks or intrusive memories of a traumatic event?</span>
                        <select
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
                  <button
                    type="button"
                    onClick={handleSubmitTest}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Submit Test
                  </button>
                </form>
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
