import { useEffect, useRef, useState } from 'react';
import { Editor } from '../../components/Editor';
// import { Editor } from 'primereact/editor';

import { createCourseChapter, deleteCourseChapter, updateCourseChapter } from '../../api';
import ChapterCreate from './ChapterCreate';
import { INITIAL_DATA } from '../../constants';
import Loader from '../../components/Loader';
import EditorQ from '../../components/Editor/QuilEditor';
import toast, { Toaster } from 'react-hot-toast';



const CourseChapters = ({ course }) => {
  const { chapters } = course;
  const { id, teacherId } = course;

  const [chapterList, setChapterList] = useState(chapters)
  const [activeChapter, setActiveChapter] = useState(chapters[0]);
  const [data, setData] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');

  const notify = (msg: string) => toast(msg);

  console.log("chapterList: ", chapterList)

  const updateChapterList = (newList) => {
    setChapterList(newList);
    console.log("updated newList", newList)
  }

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false);
      setText(activeChapter.html)
      setData(activeChapter.description);
    }, 500);
  }, [loading, activeChapter]);

  const handleChapterView = (chapter) => {
    console.log(chapter)
    setActiveChapter(chapter);
    setData(chapter.description);
    setText(chapter.html)
    // setLoading(true);
  }

  const handleSaveChapter = async (chapter) => {
    try {
      await updateCourseChapter(teacherId, id, chapter.id, { ...chapter, description: data, html: text });
      setLoading(true);
      notify("Course chapter updated successfully");
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      // window.location.reload();
    }
  }

  const handleDeleteChapter = async (chapterId: string) => {
    try {
      await deleteCourseChapter(teacherId, id, chapterId);
      setLoading(true);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
      // window.location.reload();
    }
  }

  return (
    <>
      <Toaster position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#5fbc1d',
            color: '#fff',
          },
        }} />
      <div className="flex mt-5">
        <div className="w-1/4 border-r px-3">
          <h2 className="text-xl font-semibold mb-4">Chapters</h2>
          <ul>
            {loading ? (
              <Loader loading={loading} />
            ) : <>
              {chapterList?.length > 0 && chapterList?.map((chapter) => (
                <li key={chapter.id}
                  className={
                    `mb-2 cursor-pointer p-2 rounded-md border border-gray-300 ${activeChapter && activeChapter?.id === chapter.id ? 'bg-cyan-500 text-white border-0' : ''}`
                  }
                  onClick={() => handleChapterView(chapter)}>
                  {chapter.title}
                </li>
              ))}
              <button className='p-2 rounded-md bg-green-500 text-white' onClick={() => setActiveChapter(null)}>
                {loading ? 'Creating...' : 'Create Chapter'}
              </button>
            </>}
          </ul>
        </div>
        {/* Chapter content in the main body */}
        <div className="flex-grow px-3">
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <>
              {
                chapterList?.length > 0 && activeChapter ? <>
                  <h2 className="text-xl font-semibold mb-4">{activeChapter.title}</h2>
                  <div>
                    {/* <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '320px' }} /> */}

                    {/* {data ? <Editor data={data} onChange={setData} editorblock="editorjs-container" /> :
                    <Editor data={INITIAL_DATA} onChange={setData} editorblock="editorjs-container" />
                  } */}
                    <EditorQ value={text} setValue={setText} />
                    <div className='flex justify-between my-4'>
                      <button
                        className="border px-4 py-2 rounded-md bg-green-500 text-white"
                        onClick={() => handleSaveChapter(activeChapter)}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDeleteChapter(activeChapter.id)}
                        className="border px-4 py-2 rounded-md bg-red-500 text-white">Delete</button>
                    </div>
                  </div>
                </> : chapterList?.length > 0 || chapterList && !activeChapter ? <>

                  <ChapterCreate course={course} updateChapterList={updateChapterList} setLoading={setLoading} />
                </> : 'You have not created any chapters yet.'
              }
            </>
          )}


        </div>
      </div>
    </>
  );
};

export default CourseChapters;
