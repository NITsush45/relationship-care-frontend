import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaClipboardList,
  FaStethoscope,
} from "react-icons/fa";

const Progress = () => {
  const [answers, setAnswers] = useState({});
  const [completedAt, setCompletedAt] = useState(null);

  useEffect(() => {
    const storedAnswers =
      localStorage.getItem("questionnaireAnswers");

    if (storedAnswers) {
      try {
        const data = JSON.parse(storedAnswers);

        setAnswers(data);
        setCompletedAt(data.completedAt);
      } catch (error) {
        console.error(
          "Unable to load questionnaire:",
          error
        );
      }
    }
  }, []);

  const hasQuestionnaire =
    Object.keys(answers).length > 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/40 px-4 py-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 dark:from-pink-600 dark:to-purple-700 text-white text-3xl shadow-lg mb-4">
            <FaChartLine />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            My Improvements
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Track your counselling journey and personal growth.
          </p>
        </div>

        {!hasQuestionnaire ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-black/30 p-10 text-center dark:border dark:border-gray-700">
            <div className="text-5xl mb-4 text-pink-500 dark:text-pink-400">
              <FaClipboardList />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Complete your questionnaire
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">
              Complete your questionnaire first so we can
              begin tracking your progress.
            </p>

            <a
              href="/questionnaire"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 dark:from-pink-600 dark:to-purple-700 text-white font-semibold"
            >
              Complete Questionnaire
            </a>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-5 mb-8">

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Questionnaire
                </p>

                <p className="text-2xl font-bold text-pink-600 dark:text-pink-400 mt-2">
                  Completed
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Areas Covered
                </p>

                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                  {Math.max(
                    Object.keys(answers).length - 1,
                    0
                  )}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Status
                </p>

                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">
                  Active
                </p>
              </div>

            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-black/30 p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Your Questionnaire Summary
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                {Object.entries(answers)
                  .filter(
                    ([key]) =>
                      key !== "completedAt"
                  )
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-700"
                    >
                      <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500">
                        {key.replace(
                          /([A-Z])/g,
                          " $1"
                        )}
                      </p>

                      <p className="font-medium text-gray-800 dark:text-gray-200 mt-1">
                        {value}
                      </p>
                    </div>
                  ))}

              </div>

              {completedAt && (
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-6">
                  Questionnaire completed on{" "}
                  {new Date(
                    completedAt
                  ).toLocaleString()}
                </p>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl dark:shadow-black/30 p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Therapist Progress
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Your therapist's progress notes and improvement
                measurements will appear here as sessions are
                completed.
              </p>

              <div className="mt-6 bg-purple-50 dark:bg-purple-950/30 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <FaStethoscope className="text-2xl text-purple-600 dark:text-purple-400" />

                  <div>
                    <p className="font-semibold text-purple-800 dark:text-purple-300">
                      Therapist tracking
                    </p>

                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      No therapist progress records have been
                      added yet.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Progress;