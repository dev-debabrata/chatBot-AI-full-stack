import React, { useEffect, useRef, useState } from "react";
import { Plus, Paperclip, Image as ImageIcon, Mic, X, SendHorizontal } from "lucide-react";

const Search = () => {
    const [open, setOpen] = useState(false);

    // NEW: State for the search text
    const [query, setQuery] = useState("");

    // Selected files from "Add photos & files"
    const [files, setFiles] = useState([]);
    // Selected image files from "Create image"
    const [images, setImages] = useState([]);

    const containerRef = useRef(null);
    const addFileInputRef = useRef(null);
    const createImageInputRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleOutsideClick(e) {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    // Cleanup image object URLs
    useEffect(() => {
        return () => {
            images.forEach((img) => URL.revokeObjectURL(img.preview));
        };
    }, [images]);

    const handleAddFilesClick = () => addFileInputRef.current?.click();
    const handleCreateImageClick = () => createImageInputRef.current?.click();

    const handleFilesSelected = (e) => {
        const selected = Array.from(e.target.files || []);
        if (selected.length === 0) return;
        setFiles((prev) => [...prev, ...selected]);
        e.target.value = "";
        setOpen(false);
    };

    const handleImagesSelected = (e) => {
        const selected = Array.from(e.target.files || []).filter((f) =>
            f.type.startsWith("image/")
        );
        if (selected.length === 0) {
            e.target.value = "";
            return;
        }
        const mapped = selected.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prev) => [...prev, ...mapped]);
        e.target.value = "";
        setOpen(false);
    };

    // --- NEW: SEND FUNCTION ---
    const handleSend = async () => {
        if (!query.trim() && files.length === 0 && images.length === 0) {
            alert("Please enter text or select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("query", query);

        files.forEach((f) => {
            formData.append("files", f.file || f);
        });

        images.forEach((imgObj) => {
            formData.append("files", imgObj.file);
        });

        try {
            const res = await fetch("http://localhost:5000/api/search", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                console.log("Success:", data);
                alert("Sent successfully!");

                setQuery("");
                setFiles([]);
                setImages([]);
            } else {
                console.error("Server error");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div className="w-full flex justify-center px-4 mt-6 relative" ref={containerRef}>
            <div className="w-[60%] max-w-4xl relative">

                {/* --- PREVIEWS --- */}
                <div className="mb-4 w-[50%]">
                    {/* Files list */}
                    {files.length > 0 && (
                        <div className="bg-white border border-gray-100 rounded-lg p-3 mb-3">
                            <h1 className="text-sm font-medium mb-2">Files</h1>
                            <ul className="text-sm space-y-1">
                                {files.map((f, i) => (
                                    <li key={i} className="flex items-center justify-between text-gray-700">
                                        <span>{f.file?.name || f.name}</span>
                                        <button
                                            onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                                            className="p-1 hover:bg-gray-200 rounded-full cursor-pointer"
                                        >
                                            <X size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Images preview */}
                    {images.length > 0 && (
                        <div className="bg-white border border-gray-100 rounded-lg p-3">
                            <h1 className="text-sm font-medium mb-2">Images</h1>
                            <div className="flex gap-3 flex-wrap">
                                {images.map((img, i) => (
                                    <div key={i} className="relative w-[80px] h-[80px] rounded-md border overflow-hidden">
                                        <img src={img.preview} alt="preview" className="object-cover w-full h-full" />
                                        <button
                                            onClick={() => {
                                                URL.revokeObjectURL(img.preview);
                                                setImages(prev => prev.filter((_, idx) => idx !== i));
                                            }}
                                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 cursor-pointer"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* --- SEARCH BAR --- */}
                <div>
                    <div className="bg-white rounded-full border border-gray-300 shadow-sm px-6 py-3 flex items-center justify-between relative">
                        <div className="flex items-center gap-3 flex-1">
                            <button
                                onClick={() => setOpen((s) => !s)}
                                className="p-2 rounded-full flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
                            >
                                <Plus size={26} className="text-gray-600" />
                            </button>

                            {/* UPDATED INPUT */}
                            <input
                                type="text"
                                placeholder="Ask anything"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()} // Allow Enter key to send
                                className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-base"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <Mic className="w-5 h-5 text-gray-600 cursor-pointer" />

                            {/* UPDATED SEND BUTTON */}
                            <button
                                onClick={handleSend}
                                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
                            >
                                <SendHorizontal />
                            </button>
                        </div>
                    </div>

                    {/* Hidden Inputs */}
                    <input ref={addFileInputRef} type="file" multiple onChange={handleFilesSelected} className="hidden" />
                    <input ref={createImageInputRef} type="file" multiple accept="image/*" onChange={handleImagesSelected} className="hidden" />

                    {/* Dropdown Menu */}
                    {/* {open && (
                        <div className="absolute top-14 left-3 bg-white shadow-xl border border-gray-200 rounded-2xl w-50 py-3 z-50">
                            <button
                                onClick={handleAddFilesClick}
                                className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer"
                            >
                                <Paperclip size={20} />
                                <span>Add photos & files</span>
                            </button>

                            <button
                                onClick={handleCreateImageClick}
                                className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer"
                            >
                                <ImageIcon size={20} />
                                <span>Create image</span>
                            </button>
                        </div>
                    )} */}
                    {open && (
                        <div className=" relative top-2 bg-white shadow-xl border border-gray-200 rounded-2xl w-50 py-3 z-50">
                            <button
                                onClick={handleAddFilesClick}
                                className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer">
                                <Paperclip size={20} /> <span>Add photos & files</span>
                            </button>
                            <button
                                onClick={handleCreateImageClick}
                                className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer">
                                <ImageIcon size={20} /> <span>Create image</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;


// import React, { useEffect, useRef, useState } from "react";
// import { Plus, Paperclip, Image as ImageIcon, Mic, X, SendHorizontal } from "lucide-react";

// const Search = () => {
//     const [open, setOpen] = useState(false);

//     // Selected files from "Add photos & files"
//     const [files, setFiles] = useState([]); // File[]
//     // Selected image files from "Create image"
//     const [images, setImages] = useState([]); // { file: File, preview: string }[]

//     const containerRef = useRef(null); // wraps search + dropdown
//     const addFileInputRef = useRef(null);
//     const createImageInputRef = useRef(null);

//     // Close dropdown on outside click
//     useEffect(() => {
//         function handleOutsideClick(e) {
//             if (!containerRef.current) return;
//             if (!containerRef.current.contains(e.target)) {
//                 setOpen(false);
//             }
//         }
//         document.addEventListener("mousedown", handleOutsideClick);
//         return () => document.removeEventListener("mousedown", handleOutsideClick);
//     }, []);

//     // cleanup image object URLs on unmount or when images change
//     useEffect(() => {
//         return () => {
//             images.forEach((img) => URL.revokeObjectURL(img.preview));
//         };
//     }, [images]);

//     // Handlers to open file inputs programmatically
//     const handleAddFilesClick = () => {
//         addFileInputRef.current?.click();
//     };
//     const handleCreateImageClick = () => {
//         createImageInputRef.current?.click();
//     };

//     // When user picks files (any type)
//     const handleFilesSelected = (e) => {
//         const selected = Array.from(e.target.files || []);
//         if (selected.length === 0) return;
//         setFiles((prev) => [...prev, ...selected]);
//         // reset the input so selecting same file again is possible
//         e.target.value = "";
//         setOpen(false);
//     };

//     // When user picks images (create image)
//     const handleImagesSelected = (e) => {
//         const selected = Array.from(e.target.files || []).filter((f) =>
//             f.type.startsWith("image/")
//         );
//         if (selected.length === 0) {
//             e.target.value = "";
//             return;
//         }

//         const mapped = selected.map((file) => ({
//             file,
//             preview: URL.createObjectURL(file),
//         }));

//         setImages((prev) => [...prev, ...mapped]);
//         e.target.value = "";
//         setOpen(false);
//     };

//     // Example upload function (adjust URL & form fields per backend)
//     // const uploadFiles = async (items, endpoint = "/api/upload") => {
//     //     if (!items || items.length === 0) return alert("No files to upload.");
//     //     const fd = new FormData();
//     //     items.forEach((f, idx) => {
//     //         // if items are {file, preview} objects (images), extract file
//     //         const file = f.file ?? f;
//     //         fd.append("files", file, file.name);
//     //     });

//     //     try {
//     //         const res = await fetch(endpoint, {
//     //             method: "POST",
//     //             body: fd,
//     //             // If your backend uses cookies/sessions:
//     //             // credentials: "include",
//     //         });
//     //         if (!res.ok) throw new Error(`Upload failed: ${res.statusText}`);
//     //         const data = await res.json();
//     //         console.log("Upload success:", data);
//     //         alert("Upload successful");
//     //         // clear after success
//     //         setFiles([]);
//     //         setImages([]);
//     //     } catch (err) {
//     //         console.error(err);
//     //         alert("Upload failed, check console.");
//     //     }
//     // };


//     return (
//         <div className="w-full flex justify-center px-4 mt-6 relative" ref={containerRef}>
//             <div className="w-[60%] max-w-4xl relative">

//                 {/* --- PREVIEWS ABOVE SEARCH BAR --- */}
//                 <div className="mb-4 w-[50%]">
//                     {/* Files list */}
//                     {files.length > 0 && (
//                         <div className="bg-white border border-gray-100 rounded-lg p-3 mb-3">
//                             <div className="flex items-center justify-between mb-2">
//                                 <h1 className="text-sm font-medium">Files</h1>
//                             </div>

//                             <ul className="text-sm space-y-1">
//                                 {files.map((f, i) => (
//                                     <li key={i} className="flex items-center justify-between text-gray-700">
//                                         <span>
//                                             {f.file?.name || f.name} • {((f.file?.size || f.size) / 1024).toFixed(1)} KB
//                                         </span>

//                                         {/* Delete individual file */}
//                                         <button
//                                             onClick={() => {
//                                                 setFiles((prev) => {
//                                                     const newFiles = [...prev];
//                                                     newFiles.splice(i, 1);
//                                                     return newFiles;
//                                                 });
//                                             }}
//                                             className="p-1 rounded-full hover:bg-gray-200 cursor-pointer"
//                                         >
//                                             <X size={16} />
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     {/* Images preview */}
//                     {images.length > 0 && (
//                         <div className="bg-white border border-gray-100 rounded-lg p-3">
//                             <div className="flex items-center justify-between mb-2">
//                                 <h1 className="text-sm font-medium">Images</h1>
//                             </div>

//                             <div className="flex gap-3 flex-wrap">
//                                 {images.map((img, i) => (
//                                     <div key={i} className="relative w-[80px] h-[80px] rounded-md border overflow-hidden">
//                                         <img
//                                             src={img.preview}
//                                             alt={img.file.name}
//                                             className="object-cover w-full h-full"
//                                         />

//                                         {/* Individual image delete */}
//                                         <button
//                                             onClick={() => {
//                                                 URL.revokeObjectURL(img.preview);
//                                                 setImages((prev) => {
//                                                     const arr = [...prev];
//                                                     arr.splice(i, 1);
//                                                     return arr;
//                                                 });
//                                             }}
//                                             className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 cursor-pointer"
//                                         >
//                                             <X size={14} />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>


//                 {/* Search bar */}
//                 <div>
//                     <div className="bg-white rounded-full border border-gray-300 shadow-sm px-6 py-3 flex items-center justify-between relative">
//                         {/* Left section */}
//                         <div className="flex items-center gap-3 flex-1">
//                             {/* + Button */}
//                             <button
//                                 onClick={() => setOpen((s) => !s)}
//                                 className="p-2 rounded-full flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
//                                 aria-expanded={open}
//                                 aria-label="Open quick actions"
//                             >
//                                 <Plus size={26} className="text-gray-600" />
//                             </button>

//                             <input
//                                 type="text"
//                                 placeholder="Ask anything"
//                                 className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-base"
//                             />
//                         </div>

//                         {/* Right mic button */}
//                         <div className="flex items-center gap-3">
//                             <Mic className="w-5 h-5 text-gray-600 cursor-pointer" />

//                             <button
//                                 className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center cursor-pointer"
//                                 aria-label="Voice"
//                             >
//                                 <SendHorizontal />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Hidden native file inputs */}
//                     <input
//                         ref={addFileInputRef}
//                         type="file"
//                         multiple
//                         onChange={handleFilesSelected}
//                         className="hidden"
//                     />
//                     <input
//                         ref={createImageInputRef}
//                         type="file"
//                         multiple
//                         accept="image/*"
//                         onChange={handleImagesSelected}
//                         className="hidden"
//                     />

//                     {/* Dropdown Menu */}
//                     {open && (
//                         <div className="absolute top-14 left-3 bg-white shadow-xl border border-gray-200 rounded-2xl w-50 py-3 z-50">
//                             <button
//                                 onClick={handleAddFilesClick}
//                                 className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer"
//                             >
//                                 <Paperclip size={20} />
//                                 <span>Add photos & files</span>
//                             </button>

//                             <button
//                                 onClick={handleCreateImageClick}
//                                 className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-sm text-gray-800 cursor-pointer"
//                             >
//                                 <ImageIcon size={20} />
//                                 <span>Create image</span>
//                             </button>
//                         </div>
//                     )}
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default Search;



// import React, { useState } from "react";
// import {
//     Plus,
//     Paperclip,
//     Image as ImageIcon,
//     Mic,
// } from "lucide-react";

// const Search = () => {
//     const [open, setOpen] = useState(false);

//     return (
//         <div className="w-full flex justify-center px-4 mt-6 relative">
//             <div className="w-[60%] max-w-4xl relative">
//                 {/* Search bar */}
//                 <div className="bg-white rounded-full border border-gray-300 shadow-sm px-6 py-3 flex items-center justify-between relative">
//                     {/* Left section */}
//                     <div className="flex items-center gap-3 flex-1">
//                         {/* + Button */}
//                         <button
//                             onClick={() => setOpen(!open)}
//                             className=" p-2 rounded-full flex items-center justify-center hover:bg-gray-200 transition cursor-pointer"
//                         >
//                             <Plus size={26} className=" text-gray-600" />
//                         </button>

//                         <input
//                             type="text"
//                             placeholder="Ask anything"
//                             className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-base"
//                         />
//                     </div>

//                     {/* Right mic button */}
//                     <div className="flex items-center gap-3">
//                         <Mic className="w-5 h-5 text-gray-600" />

//                         <button className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
//                             {/* Your waveform icon can go here */}
//                             <span className="font-bold text-lg leading-none">⋮</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Dropdown Menu */}
//                 {open && (
//                     <div
//                         className=" absolute top-14 left-3 bg-white shadow-xl border border-gray-200 rounded-2xl w-50 py-3 z-50">
//                         <button className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-sm text-gray-800">
//                             <Paperclip size={20} />
//                             <span>Add photos & files</span>
//                         </button>
//                         <button className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-100 text-sm text-gray-800">
//                             <ImageIcon size={20} />
//                             <span>Create image</span>
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Search;




// import React from 'react'

// const Search = () => {

//     const quickActions = ["Attach", "Search", "Study", "Create image"];
//     return (

//         <div className="w-full max-w-4xl">
//             <div className="bg-white rounded-3xl border border-gray-200 shadow-sm px-4 md:px-8 py-4 md:py-5 flex flex-col gap-4">
//                 {/* Input row */}
//                 <div className="flex items-center gap-3">
//                     <input
//                         type="text"
//                         placeholder="Ask anything"
//                         className="flex-1 bg-transparent outline-none text-sm md:text-base text-gray-900 placeholder:text-gray-400"
//                     />
//                 </div>

//                 {/* Actions + Voice */}
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                     <div className="flex flex-wrap gap-2">
//                         {quickActions.map((label) => (
//                             <button
//                                 key={label}
//                                 className="px-3 py-1.5 rounded-full border border-gray-200 text-xs md:text-sm text-gray-700 hover:bg-gray-50"
//                             >
//                                 {label}
//                             </button>
//                         ))}
//                     </div>

//                     <button className="flex items-center gap-2 rounded-full bg-gray-900 text-white text-xs md:text-sm px-4 py-1.5">
//                         <span className="inline-block h-2 w-2 rounded-full bg-white" />
//                         <span>Voice</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Search