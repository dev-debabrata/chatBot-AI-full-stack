import React from 'react'

const Search = () => {

    const quickActions = ["Attach", "Search", "Study", "Create image"];
    return (

        <div className="w-full max-w-4xl">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm px-4 md:px-8 py-4 md:py-5 flex flex-col gap-4">
                {/* Input row */}
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Ask anything"
                        className="flex-1 bg-transparent outline-none text-sm md:text-base text-gray-900 placeholder:text-gray-400"
                    />
                </div>

                {/* Actions + Voice */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        {quickActions.map((label) => (
                            <button
                                key={label}
                                className="px-3 py-1.5 rounded-full border border-gray-200 text-xs md:text-sm text-gray-700 hover:bg-gray-50"
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <button className="flex items-center gap-2 rounded-full bg-gray-900 text-white text-xs md:text-sm px-4 py-1.5">
                        <span className="inline-block h-2 w-2 rounded-full bg-white" />
                        <span>Voice</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search