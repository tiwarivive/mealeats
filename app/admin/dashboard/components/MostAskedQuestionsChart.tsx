"use client";

import { ChartPie } from "lucide-react";
import { useMemo } from "react";

import type { AskedQuestion } from "../types";

type MostAskedQuestionsChartProps = {
  questions: AskedQuestion[];
  totalQuestions: number;
};

const PIE_COLORS = [
  "#146cff",
  "#7657db",
  "#249b8d",
  "#e79a00",
  "#3FA6A9",
];

type ChartQuestion = {
  key: string;
  value: number;
  color: string;
  rank?: number;
  question: string;
  count: number;
  percentage: number;
  date?: string;
  time?: string;
  isOther?: boolean;
};

const OTHER_COLOR = "#98A2B3";
const MAX_VISIBLE_QUESTIONS = 5;

type NormalizedQuestion = AskedQuestion & {
  key: string;
  value: number;
};

type ChartItem = NormalizedQuestion & {
  color: string;
  isOther?: boolean;
  rank: number;
};

function truncateQuestion(
  question: string,
  length = 34
) {
  if (!question) {
    return "Unknown question";
  }

  if (question.length <= length) {
    return question;
  }

  return `${question.slice(0, length)}…`;
}

function getPercentage(
  value: number,
  total: number
) {
  if (!total) {
    return 0;
  }

  return (value / total) * 100;
}

function createPiePath(
  startAngle: number,
  endAngle: number,
  radius = 76,
  center = 100
) {
  const startRadians =
    (startAngle * Math.PI) / 180;

  const endRadians =
    (endAngle * Math.PI) / 180;

  const x1 =
    center +
    radius * Math.cos(startRadians);

  const y1 =
    center +
    radius * Math.sin(startRadians);

  const x2 =
    center +
    radius * Math.cos(endRadians);

  const y2 =
    center +
    radius * Math.sin(endRadians);

  const angle =
    endAngle - startAngle;

  /*
   * SVG cannot render a complete 360° arc
   * as one A command.
   *
   * This handles the case where there is
   * only one chart segment.
   */
  if (angle >= 359.999) {
    return [
      `M ${center} ${center - radius}`,
      `A ${radius} ${radius} 0 1 1 ${center} ${
        center + radius
      }`,
      `A ${radius} ${radius} 0 1 1 ${center} ${
        center - radius
      }`,
      "Z",
    ].join(" ");
  }

  const largeArcFlag = angle > 180 ? 1 : 0;

  return [
    `M ${center} ${center}`,
    `L ${x1} ${y1}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    "Z",
  ].join(" ");
}

export default function MostAskedQuestionsChart({
  questions,
  totalQuestions,
}: MostAskedQuestionsChartProps) {
  /*
   * ---------------------------------------------------------
   * NORMALIZE API DATA
   * ---------------------------------------------------------
   *
   * We never mutate the API response.
   *
   * The frontend creates a safe display representation:
   * - converts count to number
   * - removes invalid/zero counts
   * - sorts by frequency
   */
  const normalizedQuestions =
    useMemo<NormalizedQuestion[]>(() => {
      if (!Array.isArray(questions)) {
        return [];
      }

      return questions
        .map((question, index) => ({
          ...question,
          value: Number(question.count) || 0,
          key: `${question.question}-${index}`,
        }))
        .filter(
          (question) => question.value > 0
        )
        .sort(
          (a, b) => b.value - a.value
        );
    }, [questions]);

  /*
   * ---------------------------------------------------------
   * CALCULATE TOTAL REPRESENTED BY THE DATA
   * ---------------------------------------------------------
   *
   * totalQuestions comes from the backend and should represent
   * the total number of questions asked.
   *
   * We also calculate the sum of returned counts.
   *
   * If the backend total is greater than the returned rows,
   * the missing amount is automatically represented by "Other".
   *
   * Example:
   *
   * API total = 30
   * Returned counts = 21
   *
   * The chart still represents 30.
   *
   * We do NOT invent individual questions.
   */
  const returnedQuestionsTotal =
    useMemo(() => {
      return normalizedQuestions.reduce(
        (sum, question) =>
          sum + question.value,
        0
      );
    }, [normalizedQuestions]);

  const displayTotal = useMemo(() => {
    const backendTotal =
      Number(totalQuestions) || 0;

    /*
     * Prefer the backend total when it is valid
     * and greater than or equal to returned counts.
     *
     * If the backend total is unexpectedly smaller
     * than the returned counts, use the actual returned
     * count so the visualization can never become invalid.
     */
    return Math.max(
      backendTotal,
      returnedQuestionsTotal
    );
  }, [
    totalQuestions,
    returnedQuestionsTotal,
  ]);

  /*
   * ---------------------------------------------------------
   * BUILD DISPLAY DATA
   * ---------------------------------------------------------
   *
   * Show top five questions.
   *
   * Everything else becomes "Other".
   *
   * IMPORTANT:
   *
   * "Other" is based on the actual total represented
   * by the dashboard, not merely the sum of the rows
   * returned by the API.
   */
const chartData = useMemo<ChartQuestion[]>(() => {
  if (!normalizedQuestions.length) {
    if (displayTotal > 0) {
      return [
        {
          question: "Other",
          count: displayTotal,
          percentage: 100,
          date: undefined,
          time: undefined,
          value: displayTotal,
          key: "other",
          color: OTHER_COLOR,
          isOther: true,
        },
      ];
    }

    return [];
  }

  const topQuestions: ChartQuestion[] =
    normalizedQuestions
      .slice(0, MAX_VISIBLE_QUESTIONS)
      .map((question, index) => ({
        ...question,
        color:
          PIE_COLORS[
            index % PIE_COLORS.length
          ],
        rank: index + 1,
        isOther: false,
      }));

  const topQuestionsTotal =
    topQuestions.reduce(
      (sum, question) =>
        sum + question.value,
      0
    );

  const otherCount = Math.max(
    displayTotal - topQuestionsTotal,
    0
  );

  if (otherCount > 0) {
    topQuestions.push({
      question: "Other",
      count: otherCount,
      percentage:
        displayTotal > 0
          ? (otherCount / displayTotal) * 100
          : 0,
      date: undefined,
      time: undefined,
      value: otherCount,
      key: "other",
      color: OTHER_COLOR,
      isOther: true,
    });
  }

  return topQuestions;
}, [
  normalizedQuestions,
  displayTotal,
]);

  /*
   * ---------------------------------------------------------
   * FINAL CHART TOTAL
   * ---------------------------------------------------------
   *
   * Normally this will equal displayTotal.
   *
   * Keeping this calculated from chartData guarantees that
   * the donut, percentages and center value always use the
   * same denominator.
   */
  const chartTotal = useMemo(() => {
    return chartData.reduce(
      (sum, item) =>
        sum + item.value,
      0
    );
  }, [chartData]);

  /*
   * ---------------------------------------------------------
   * SVG PIE SEGMENTS
   * ---------------------------------------------------------
   */
  const pieSegments = useMemo(() => {
    if (!chartTotal) {
      return [];
    }

    let currentAngle = -90;

    return chartData.map((item) => {
      const percentage =
        item.value / chartTotal;

      const startAngle =
        currentAngle;

      const endAngle =
        currentAngle +
        percentage * 360;

      currentAngle = endAngle;

      return {
        ...item,
        path: createPiePath(
          startAngle,
          endAngle
        ),
        calculatedPercentage:
          percentage * 100,
      };
    });
  }, [chartData, chartTotal]);

  const hasData = chartTotal > 0;

  const hasOther = chartData.some(
    (item) => item.isOther
  );

  const visibleQuestionCount =
    Math.min(
      normalizedQuestions.length,
      MAX_VISIBLE_QUESTIONS
    );

  return (
    <section
      className="
        flex
        min-w-0
        flex-col
        overflow-hidden
        rounded-[14px]
        border
        border-white/80
        bg-white
        shadow-[0_2px_12px_rgba(15,23,42,0.04)]
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div
        className="
          flex
          min-w-0
          shrink-0
          items-center
          gap-3
          border-b
          border-[#edf0f4]
          px-4
          py-3.5
          sm:px-5
          sm:py-4
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-[10px]
            bg-[#f1edff]
            text-[#7657db]
            sm:h-11
            sm:w-11
          "
        >
          <ChartPie
            size={21}
            strokeWidth={1.8}
          />
        </div>

        <div className="min-w-0">
          <h2
            className="
              !mb-0
              !text-[16px]
              !font-semibold
              !leading-5
              tracking-[-0.01em]
              text-[#26354d]
              sm:!text-[17px]
            "
          >
            Most asked questions
          </h2>

          <p
            className="
              mt-1
              text-[11px]
              leading-4
              text-[#98A2B3]
              sm:text-[12px]
            "
          >
            Questions asked most often
          </p>
        </div>
      </div>

      {/* =====================================================
          EMPTY STATE
      ====================================================== */}
      {!hasData ? (
        <div
          className="
            flex
            min-h-[280px]
            flex-1
            items-center
            justify-center
            px-5
            py-10
            text-center
          "
        >
          <div className="max-w-[250px]">
            <div
              className="
                mx-auto
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#f5f7fa]
                text-[#98A2B3]
              "
            >
              <ChartPie
                size={21}
                strokeWidth={1.7}
              />
            </div>

            <p
              className="
                mt-3
                text-[13px]
                font-semibold
                text-[#475467]
              "
            >
              No question data available
            </p>

            <p
              className="
                mt-1
                text-[12px]
                leading-5
                text-[#98A2B3]
              "
            >
              AI question statistics will appear
              here once questions are available.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="
            min-w-0
            flex-1
            p-4
            sm:p-5
          "
        >
          {/* =================================================
              MAIN CONTENT

              Desktop:
              Donut | Ranked list

              Mobile:
              Donut
              Ranked list
          ================================================== */}
          <div
            className="
              grid
              min-w-0
              grid-cols-1
              items-center
              gap-5
              lg:grid-cols-[150px_minmax(0,1fr)]
              lg:gap-5
            "
          >
            {/* =================================================
                DONUT
            ================================================== */}
            <div
              className="
                flex
                min-w-0
                justify-center
                lg:justify-start
              "
            >
              <div
                className="
                  relative
                  h-[165px]
                  w-[165px]
                  shrink-0
                  sm:h-[175px]
                  sm:w-[175px]
                "
              >
                <svg
                  viewBox="0 0 200 200"
                  className="h-full w-full"
                  role="img"
                  aria-labelledby="most-asked-chart-title most-asked-chart-description"
                >
                  <title id="most-asked-chart-title">
                    Most asked questions
                    distribution
                  </title>

                  <desc id="most-asked-chart-description">
                    A donut chart showing the
                    distribution of frequently asked
                    AI questions.
                  </desc>

                  {pieSegments.map(
                    (segment) => (
                      <path
                        key={segment.key}
                        d={segment.path}
                        fill={segment.color}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                      />
                    )
                  )}

                  {/* Donut hole */}
                  <circle
                    cx="100"
                    cy="100"
                    r="52"
                    fill="white"
                  />
                </svg>

                {/* Center value */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    flex
                    flex-col
                    items-center
                    justify-center
                  "
                >
                  <span
                    className="
                      text-[24px]
                      font-semibold
                      leading-none
                      tracking-[-0.03em]
                      text-[#07152f]
                    "
                  >
                    {chartTotal}
                  </span>

                  <span
                    className="
                      mt-1
                      text-[10px]
                      font-medium
                      leading-4
                      text-[#98A2B3]
                    "
                  >
                    Total asked
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                RANKED QUESTION LIST
            ================================================== */}
            <div
              className="
                min-w-0
                border-t
                border-[#edf0f4]
                pt-4
                lg:border-t-0
                lg:pt-0
              "
            >
              {/* List heading */}
              <div
                className="
                  mb-2.5
                  flex
                  min-w-0
                  items-center
                  justify-between
                  gap-3
                "
              >
                <p
                  className="
                    text-[12px]
                    font-semibold
                    leading-4
                    text-[#475467]
                  "
                >
                  Most asked
                </p>

                <p
                  className="
                    shrink-0
                    text-[10px]
                    leading-4
                    text-[#98A2B3]
                    sm:text-[11px]
                  "
                >
                  {visibleQuestionCount} shown
                </p>
              </div>

              {/* Question rows */}
              <div
                className="
                  min-w-0
                  divide-y
                  divide-[#f0f2f5]
                "
              >
                {chartData.map(
                  (question, index) => {
                    const percentage =
                      getPercentage(
                        question.value,
                        chartTotal
                      );

                    return (
                      <div
                        key={question.key}
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-2.5
                          py-2
                          first:pt-1
                          last:pb-1
                        "
                      >
                        {/* Rank */}
                        <span
                          className="
                            w-[18px]
                            shrink-0
                            text-[10px]
                            font-medium
                            tabular-nums
                            text-[#98A2B3]
                          "
                        >
                          {question.isOther
                            ? "—"
                            : String(
                                index + 1
                              ).padStart(
                                2,
                                "0"
                              )}
                        </span>

                        {/* Color indicator */}
                        <span
                          aria-hidden="true"
                          className="
                            h-2
                            w-2
                            shrink-0
                            rounded-full
                          "
                          style={{
                            backgroundColor:
                              question.color,
                          }}
                        />

                        {/* Question */}
                        <p
                          title={
                            question.question
                          }
                          className="
                            min-w-0
                            flex-1
                            truncate
                            text-[11px]
                            leading-4
                            text-[#475467]
                            sm:text-[12px]
                          "
                        >
                          {truncateQuestion(
                            question.question
                          )}
                        </p>

                        {/* Count */}
                        <span
                          className="
                            shrink-0
                            text-[11px]
                            font-semibold
                            leading-4
                            tabular-nums
                            text-[#26354D]
                            sm:text-[12px]
                          "
                        >
                          {question.value}
                        </span>

                        {/* Percentage */}
                        <span
                          className="
                            w-[38px]
                            shrink-0
                            text-right
                            text-[10px]
                            font-medium
                            leading-4
                            tabular-nums
                            text-[#98A2B3]
                            sm:text-[11px]
                          "
                        >
                          {Math.round(
                            percentage
                          )}
                          %
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* =================================================
              SMALL CONTEXT NOTE
          ================================================== */}
          {hasOther && (
            <div
              className="
                mt-3
                border-t
                border-[#edf0f4]
                pt-2.5
              "
            >
              <p
                className="
                  text-[10px]
                  leading-4
                  text-[#98A2B3]
                  sm:text-[11px]
                "
              >
                Other includes questions outside
                the top five.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}