import React from 'react'

export default function Coursecard() {
  return (
    <>
    <div
                  class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                >
                  <div
                    class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p
                      class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                    >
                      Total courses
                    </p>
                    <p
                      class="text-lg font-semibold text-gray-700 dark:text-gray-200"
                    >
                      $ 46,760.89
                    </p>
                  </div>
                </div>
    </>
  )
}
