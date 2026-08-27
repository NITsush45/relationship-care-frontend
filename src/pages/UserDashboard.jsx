import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const basicQuestions = [
    {
      id: "identity",
      question: "How do you identify?",
      type: "options",
      options: [
        "Male",
        "Female",
        "Non-binary",
        "Lesbian",
        "Gay",
        "Bisexual",
        "Queer",
        "Prefer not to say",
      ],
    },
    {
      id: "age",
      question: "What is your age?",
      type: "number",
      placeholder: "Enter your age",
    },
    {
      id: "stress",
      question: "How stressed have you been feeling lately?",
      type: "options",
      options: [
        "Not at all",
        "A little",
        "Moderately",
        "Quite stressed",
        "Extremely stressed",
      ],
    },
    {
      id: "extracurricular",
      question: "What extracurricular activities do you participate in?",
      type: "text",
      placeholder: "Sports, music, volunteering, clubs...",
    },
    {
      id: "hobbies",
      question: "What are your favorite hobbies?",
      type: "text",
      placeholder: "Tell us about your hobbies...",
    },
    {
      id: "career",
      question: "What career are you currently pursuing?",
      type: "text",
      placeholder: "Student, Software Engineer, Doctor...",
    },
    {
      id: "relationshipStatus",
      question: "What is your current relationship status?",
      type: "options",
      options: [
        "Single",
        "In a Relationship",
        "Married",
      ],
    },
    {
      id: "physicalActivity",
      question:
        "How often do you exercise or participate in physical activities?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "1–2 times a week",
        "3–5 times a week",
        "Daily",
      ],
    },
    {
      id: "sleep",
      question: "How would you describe your sleep quality?",
      type: "options",
      options: [
        "Very poor",
        "Poor",
        "Average",
        "Good",
        "Excellent",
      ],
    },
    {
      id: "socialLife",
      question:
        "How often do you spend time with friends or family?",
      type: "options",
      options: [
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
  ];

  const lgbtqQuestions = [
    {
      id: "identityComfort",
      question:
        "How comfortable do you feel with your identity?",
      type: "options",
      options: [
        "Very uncomfortable",
        "Uncomfortable",
        "Neutral",
        "Comfortable",
        "Very comfortable",
      ],
    },
    {
      id: "selfAcceptance",
      question:
        "How accepting do you currently feel toward yourself?",
      type: "options",
      options: [
        "I am struggling a lot",
        "I am struggling somewhat",
        "I feel neutral",
        "I am mostly accepting",
        "I completely accept myself",
      ],
    },
    {
      id: "supportSystem",
      question:
        "Do you have people who support and accept you for who you are?",
      type: "options",
      options: [
        "No",
        "Very few",
        "Some",
        "Most people around me",
        "Yes, strongly",
      ],
    },
    {
      id: "familyAcceptance",
      question:
        "How comfortable do you feel discussing your identity with your family?",
      type: "options",
      options: [
        "Not comfortable",
        "Slightly comfortable",
        "Somewhat comfortable",
        "Very comfortable",
        "I have already discussed it",
      ],
    },
    {
      id: "socialAcceptance",
      question:
        "Do you ever feel judged or excluded because of your identity?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
    {
      id: "communityConnection",
      question:
        "Do you feel connected to a supportive community?",
      type: "options",
      options: [
        "Not at all",
        "A little",
        "Somewhat",
        "Quite connected",
        "Very connected",
      ],
    },
    {
      id: "identityStress",
      question:
        "Does thinking about your identity ever cause you stress or anxiety?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
    {
      id: "comingOutComfort",
      question:
        "How comfortable are you sharing your identity with people you trust?",
      type: "options",
      options: [
        "Not comfortable",
        "Slightly comfortable",
        "Somewhat comfortable",
        "Very comfortable",
        "Completely comfortable",
      ],
    },
    {
      id: "belonging",
      question:
        "How much do you feel that you can be yourself around the people in your life?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always",
      ],
    },
    {
      id: "identitySupport",
      question:
        "Would you like support regarding identity, relationships, family, or social experiences?",
      type: "options",
      options: [
        "No",
        "Maybe",
        "Yes",
      ],
    },
  ];

  const singleQuestions = [
    {
      id: "confidence",
      question:
        "How confident do you currently feel about yourself?",
      type: "options",
      options: [
        "Very low",
        "Low",
        "Average",
        "High",
        "Very high",
      ],
    },
    {
      id: "personality",
      question:
        "How would you describe your personality?",
      type: "options",
      options: [
        "Introvert",
        "Extrovert",
        "Ambivert",
      ],
    },
    {
      id: "socializing",
      question:
        "How much do you enjoy spending time with other people?",
      type: "options",
      options: [
        "Not at all",
        "A little",
        "Sometimes",
        "Usually",
        "I love socializing",
      ],
    },
    {
      id: "loneliness",
      question:
        "How often do you feel lonely?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
    {
      id: "selfWorth",
      question:
        "How would you describe your current sense of self-worth?",
      type: "options",
      options: [
        "Very low",
        "Low",
        "Average",
        "Good",
        "Very good",
      ],
    },
    {
      id: "futureOptimism",
      question:
        "How optimistic do you feel about your future?",
      type: "options",
      options: [
        "Not optimistic",
        "Slightly optimistic",
        "Moderately optimistic",
        "Very optimistic",
      ],
    },
    {
      id: "trustedPerson",
      question:
        "Do you have someone you can comfortably talk to about your problems?",
      type: "options",
      options: [
        "No",
        "Sometimes",
        "Yes",
      ],
    },
    {
      id: "socialAnxiety",
      question:
        "How often do you feel nervous or uncomfortable in social situations?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
    {
      id: "romanticInterest",
      question:
        "Are you currently interested in meeting someone romantically?",
      type: "options",
      options: [
        "Not currently",
        "Maybe",
        "Yes",
      ],
    },
    {
      id: "pastRelationship",
      question:
        "Have past relationships affected how you approach relationships today?",
      type: "options",
      options: [
        "Not at all",
        "A little",
        "Moderately",
        "A lot",
      ],
    },
    {
      id: "recentBreakup",
      question:
        "Have you recently experienced a breakup or emotional disappointment?",
      type: "options",
      options: [
        "No",
        "Yes, recently",
        "Yes, some time ago",
      ],
    },
    {
      id: "motivation",
      question:
        "How motivated do you feel in your daily life?",
      type: "options",
      options: [
        "Very low",
        "Low",
        "Average",
        "High",
        "Very high",
      ],
    },
    {
      id: "personalGrowth",
      question:
        "How interested are you in personal growth and self-improvement?",
      type: "options",
      options: [
        "Not interested",
        "Somewhat interested",
        "Very interested",
      ],
    },
    {
      id: "emotionalWellbeing",
      question:
        "How would you describe your overall emotional well-being?",
      type: "options",
      options: [
        "Very difficult",
        "Difficult",
        "Okay",
        "Good",
        "Very good",
      ],
    },
    {
      id: "singleGoal",
      question:
        "What is one area of your personal life you would most like to improve?",
      type: "text",
      placeholder:
        "Confidence, friendships, dating, motivation...",
    },
  ];

  const relationshipQuestions = [
    {
      id: "relationshipDuration",
      question:
        "How long have you been in your current relationship?",
      type: "text",
      placeholder:
        "For example: 2 years, 6 months...",
    },
    {
      id: "partnerIssues",
      question:
        "Are you currently experiencing any issues with your partner?",
      type: "options",
      options: [
        "No",
        "Minor issues",
        "Some issues",
        "Serious issues",
      ],
    },
    {
      id: "partnerTime",
      question:
        "How much time do you usually spend with your partner each day?",
      type: "options",
      options: [
        "Less than 1 hour",
        "1–2 hours",
        "2–4 hours",
        "More than 4 hours",
      ],
    },
    {
      id: "communication",
      question:
        "How would you describe communication with your partner?",
      type: "options",
      options: [
        "Very poor",
        "Poor",
        "Average",
        "Good",
        "Excellent",
      ],
    },
    {
      id: "conflicts",
      question:
        "How often do you and your partner have disagreements?",
      type: "options",
      options: [
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
    {
      id: "conflictResolution",
      question:
        "How well do you resolve disagreements together?",
      type: "options",
      options: [
        "Poorly",
        "Somewhat",
        "Well",
        "Very well",
      ],
    },
    {
      id: "trust",
      question:
        "How would you rate the level of trust in your relationship?",
      type: "options",
      options: [
        "Very low",
        "Low",
        "Average",
        "High",
        "Very high",
      ],
    },
    {
      id: "emotionalConnection",
      question:
        "How emotionally connected do you feel to your partner?",
      type: "options",
      options: [
        "Not connected",
        "Slightly connected",
        "Moderately connected",
        "Very connected",
      ],
    },
    {
      id: "qualityTime",
      question:
        "Do you feel that you spend enough quality time together?",
      type: "options",
      options: [
        "No",
        "Sometimes",
        "Mostly",
        "Yes",
      ],
    },
    {
      id: "livingTogether",
      question:
        "Do you currently live together with your partner?",
      type: "options",
      options: [
        "Yes",
        "No",
      ],
    },
    {
      id: "intimacy",
      question:
        "How satisfied are you with the emotional intimacy in your relationship?",
      type: "options",
      options: [
        "Very dissatisfied",
        "Dissatisfied",
        "Neutral",
        "Satisfied",
        "Very satisfied",
      ],
    },
    {
      id: "partnerSupport",
      question:
        "Do you feel emotionally supported by your partner?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always",
      ],
    },
    {
      id: "jealousy",
      question:
        "How often do jealousy or insecurity affect your relationship?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
    {
      id: "futureTogether",
      question:
        "How confident do you feel about your future together?",
      type: "options",
      options: [
        "Not confident",
        "Slightly confident",
        "Moderately confident",
        "Very confident",
      ],
    },
    {
      id: "relationshipGoal",
      question:
        "What would you most like to improve in your relationship?",
      type: "text",
      placeholder:
        "Communication, trust, quality time...",
    },
  ];

  const marriedQuestions = [
    {
      id: "marriageDuration",
      question:
        "How long have you been married?",
      type: "text",
      placeholder:
        "For example: 5 years...",
    },
    {
      id: "marriageSatisfaction",
      question:
        "How satisfied are you with your marriage?",
      type: "options",
      options: [
        "Very dissatisfied",
        "Dissatisfied",
        "Neutral",
        "Satisfied",
        "Very satisfied",
      ],
    },
    {
      id: "spouseCommunication",
      question:
        "How would you describe communication with your spouse?",
      type: "options",
      options: [
        "Very poor",
        "Poor",
        "Average",
        "Good",
        "Excellent",
      ],
    },
    {
      id: "marriageConflict",
      question:
        "How often do you and your spouse have conflicts?",
      type: "options",
      options: [
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
    {
      id: "emotionalSupport",
      question:
        "Do you feel emotionally supported by your spouse?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Always",
      ],
    },
    {
      id: "qualityTimeMarriage",
      question:
        "How often do you spend quality time together?",
      type: "options",
      options: [
        "Rarely",
        "Sometimes",
        "Often",
        "Daily",
      ],
    },
    {
      id: "responsibilities",
      question:
        "How satisfied are you with how household responsibilities are shared?",
      type: "options",
      options: [
        "Very dissatisfied",
        "Dissatisfied",
        "Neutral",
        "Satisfied",
        "Very satisfied",
      ],
    },
    {
      id: "financialStress",
      question:
        "Does financial pressure create stress in your marriage?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
    {
      id: "familyPressure",
      question:
        "Do family responsibilities or expectations create relationship stress?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Very often",
      ],
    },
    {
      id: "marriageTrust",
      question:
        "How would you rate the trust between you and your spouse?",
      type: "options",
      options: [
        "Very low",
        "Low",
        "Average",
        "High",
        "Very high",
      ],
    },
    {
      id: "romance",
      question:
        "How satisfied are you with romance in your marriage?",
      type: "options",
      options: [
        "Very dissatisfied",
        "Dissatisfied",
        "Neutral",
        "Satisfied",
        "Very satisfied",
      ],
    },
    {
      id: "personalSpace",
      question:
        "Do you feel you have enough personal space and independence?",
      type: "options",
      options: [
        "No",
        "Sometimes",
        "Mostly",
        "Yes",
      ],
    },
    {
      id: "healthRoutine",
      question:
        "How often do you practice activities such as yoga, meditation, or exercise?",
      type: "options",
      options: [
        "Never",
        "Rarely",
        "Sometimes",
        "Often",
        "Daily",
      ],
    },
    {
      id: "stressManagement",
      question:
        "How well do you currently manage stress in your personal life?",
      type: "options",
      options: [
        "Very poorly",
        "Poorly",
        "Average",
        "Well",
        "Very well",
      ],
    },
    {
      id: "marriageGoal",
      question:
        "What would you most like to improve in your marriage?",
      type: "text",
      placeholder:
        "Communication, trust, intimacy, quality time...",
    },
  ];

  /*
   * Build the questionnaire dynamically.
   * No useMemo is required, so Vercel's ESLint
   * react-hooks/exhaustive-deps warning is avoided.
   */
  const identity = answers.identity;
  const relationshipStatus = answers.relationshipStatus;

  const isLGBTQ = [
    "Lesbian",
    "Gay",
    "Bisexual",
    "Queer",
  ].includes(identity);

  let relationshipBranch = [];

  if (relationshipStatus === "Single") {
    relationshipBranch = singleQuestions;
  } else if (relationshipStatus === "In a Relationship") {
    relationshipBranch = relationshipQuestions;
  } else if (relationshipStatus === "Married") {
    relationshipBranch = marriedQuestions;
  }

  const questions = [
    ...basicQuestions,
    ...(isLGBTQ ? lgbtqQuestions : []),
    ...relationshipBranch,
  ];

  /*
   * If the questionnaire branch changes while editing,
   * make sure the current step remains valid.
   */
  useEffect(() => {
    if (step >= questions.length) {
      setStep(Math.max(questions.length - 1, 0));
    }
  }, [step, questions.length]);

  const currentQuestion = questions[step];

  const handleAnswer = (value) => {
    if (!currentQuestion) {
      return;
    }

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (!currentQuestion) {
      return;
    }

    const currentAnswer = answers[currentQuestion.id];

    if (
      currentAnswer === undefined ||
      currentAnswer === null ||
      String(currentAnswer).trim() === ""
    ) {
      return;
    }

    if (step < questions.length - 1) {
      setStep((previous) => previous + 1);
      return;
    }

    const completedAt = new Date().toISOString();

    const questionnaireData = {
      ...answers,
      completedAt,
    };

    localStorage.setItem(
      "questionnaireAnswers",
      JSON.stringify(questionnaireData)
    );

    localStorage.setItem(
      "questionnaireCompleted",
      "true"
    );

    navigate("/");
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((previous) => previous - 1);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          Loading questionnaire...
        </p>
      </div>
    );
  }

  const progress =
    ((step + 1) / questions.length) * 100;

  const hasAnswer =
    answers[currentQuestion.id] !== undefined &&
    answers[currentQuestion.id] !== null &&
    String(answers[currentQuestion.id]).trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-2xl">

        <div className="text-center mb-8">

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-white text-3xl shadow-lg mb-4">
            💗
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Let's Get to Know You
          </h1>

          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Answer a few questions so we can better understand
            your personality, lifestyle, relationships, and
            counselling needs.
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">

          <div className="mb-8">

            <div className="flex justify-between items-center text-sm text-gray-500 mb-3">

              <span>
                Question {step + 1} of {questions.length}
              </span>

              <span className="font-medium text-pink-500">
                {Math.round(progress)}%
              </span>

            </div>

            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          <div className="min-h-[330px] flex flex-col justify-center">

            <div className="mb-8">

              <p className="text-sm font-semibold text-pink-500 mb-3">
                PERSONALIZED COUNSELLING QUESTIONNAIRE
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                {currentQuestion.question}
              </h2>

            </div>

            {currentQuestion.type === "options" && (
              <div className="grid grid-cols-1 gap-3">

                {currentQuestion.options.map((option) => {

                  const selected =
                    answers[currentQuestion.id] === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        handleAnswer(option)
                      }
                      className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 ${
                        selected
                          ? "border-pink-500 bg-pink-50 text-pink-700 shadow-sm"
                          : "border-gray-100 bg-gray-50 text-gray-700 hover:border-pink-200 hover:bg-pink-50"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <span className="font-medium">
                          {option}
                        </span>

                        {selected && (
                          <span className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">
                            ✓
                          </span>
                        )}

                      </div>

                    </button>
                  );
                })}

              </div>
            )}

            {(currentQuestion.type === "text" ||
              currentQuestion.type === "number") && (
              <div>

                <input
                  type={currentQuestion.type}
                  min={
                    currentQuestion.type === "number"
                      ? 1
                      : undefined
                  }
                  max={
                    currentQuestion.type === "number"
                      ? 120
                      : undefined
                  }
                  value={
                    answers[currentQuestion.id] || ""
                  }
                  onChange={(event) =>
                    handleAnswer(event.target.value)
                  }
                  placeholder={
                    currentQuestion.placeholder
                  }
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 bg-gray-50 text-gray-800 focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all"
                />

                {currentQuestion.type === "text" && (
                  <p className="text-sm text-gray-400 mt-3">
                    Share as much or as little as you're
                    comfortable with.
                  </p>
                )}

              </div>
            )}

          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">

            <button
              type="button"
              onClick={handleBack}
              disabled={step === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                step === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!hasAnswer}
              className={`px-8 py-3 rounded-xl font-semibold text-white transition-all ${
                hasAnswer
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg hover:scale-[1.02]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {step === questions.length - 1
                ? "Finish ✓"
                : "Continue →"}
            </button>

          </div>

        </div>

        <p className="text-center text-gray-400 text-sm mt-5">
          Your responses help personalize your counselling
          experience.
        </p>

      </div>

    </div>
  );
};

export default UserDashboard;