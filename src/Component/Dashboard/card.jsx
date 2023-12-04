import React from 'react'


export default function Card({ title, count, Icon, color }) {
  return (
    <>
      <div
        class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
      >

        <div
          class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
        >
          {Icon}
        </div>
        <div>
          <p
            class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            {title}
          </p>
          <p
            class="text-lg font-semibold text-gray-700 dark:text-gray-200"
          >
            {count}
          </p>
        </div>
      </div>
    </>
  )
}
