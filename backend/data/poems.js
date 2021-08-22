let poems = [
  {
    id: 0,
    title: "Campervan",
    author: "Bob Bobalooba",
    authorid: 0,
    text: "__Lorem__ ipsum dolor sit amet,  \nconsectetur adipiscing elit,  \n sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  \n Ut enim ad minim veniam,  \n quis nostrud exercitation  \n ullamco  \n laboris nisi ut aliquip ex ea commodo consequat.  \n Duis aute irure dolor  \n in reprehenderit in  \n voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n Excepteur sint occaecat cupidatat non proident,  \n sunt in culpa qui  \n officia deserunt mollit anim  \n id est  \n laborum.",
    votes: 3,
  },
  {
    id: 1,
    title: "Spartacus",
    author: "Mary Contrary",
    authorid: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    votes: 0,
  },
  {
    id: 2,
    title: "In the margins",
    author: "Bob Bobalooba",
    authorid: 0,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    votes: 5,
  },
  {
    id: 3,
    title: "Weather Station",
    author: "Mary Contrary",
    authorid: 1,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    votes: 2,
  },
  {
    title: "Testing",
    author: "Van Nguyen",
    text: "zxzxczxcxzczxcadaddadad **Lorem** 424242424234234",
    id: 4,
    votes: 2,
  },
  {
    title: "Ahihi I'm joking",
    author: "Van Nguyen",
    text: "## Heading\nHow are you doing today?\nI gonna kill you bastard!!!!!\n~~strikethrough~~",
    id: 5,
    votes: 0,
  },
  {
    title: "This is about coding",
    author: "my name is Van Nguyen",
    text: '```js\n  return (\n    <>\n      <div className={classes.space}></div>\n      <div className={classes.wrapper}>\n        <div className={classes.container}>\n          <div className={classes.vote}>\n            <div onClick={upVoteHandler} className={classes.upVote}>\n              <i className="fas fa-chevron-up"></i>\n            </div>\n            <p>{currentVote}</p>\n            <div className={classes.downVote}>\n              <i className="fas fa-chevron-down"></i>\n            </div>\n          </div>\n\n          <div className={classes.heading}>\n            <h3 to={`/poem/${singlePoem.id}`} className={classes.title}>\n              {singlePoem.title}\n            </h3>\n            <div className={classes.author}>\n              <p>By {singlePoem.author}</p>\n            </div>\n            {singlePoem.title ? (\n              <div className={classes.coverLetter}>{singlePoem.title[0]}</div>\n            ) : (\n              ""\n            )}\n          </div>\n          <div className={classes.main}>\n            <ReactMarkdown\n              components={components}\n              remarkPlugins={[remarkGfm]}\n              children={singlePoem.text}\n              className={classes.content}\n            ></ReactMarkdown>\n          </div>\n          <div className={classes.footer}>\n            <button className={classes.voteBtn}>Vote</button>\n          </div>\n        </div>\n      </div>\n    </>\n      return (\n    <>\n      <div className={classes.space}></div>\n      <div className={classes.wrapper}>\n        <div className={classes.container}>\n          <div className={classes.vote}>\n            <div onClick={upVoteHandler} className={classes.upVote}>\n              <i className="fas fa-chevron-up"></i>\n            </div>\n            <p>{currentVote}</p>\n            <div className={classes.downVote}>\n              <i className="fas fa-chevron-down"></i>\n            </div>\n          </div>\n\n          <div className={classes.heading}>\n            <h3 to={`/poem/${singlePoem.id}`} className={classes.title}>\n              {singlePoem.title}\n            </h3>\n            <div className={classes.author}>\n              <p>By {singlePoem.author}</p>\n            </div>\n            {singlePoem.title ? (\n              <div className={classes.coverLetter}>{singlePoem.title[0]}</div>\n            ) : (\n              ""\n            )}\n          </div>\n          <div className={classes.main}>\n            <ReactMarkdown\n              components={components}\n              remarkPlugins={[remarkGfm]}\n              children={singlePoem.text}\n              className={classes.content}\n            ></ReactMarkdown>\n          </div>\n          <div className={classes.footer}>\n            <button className={classes.voteBtn}>Vote</button>\n          </div>\n        </div>\n      </div>\n    </>\n```',
    id: 6,
    votes: 0,
  },
];

const findPostById = (id) => {
  const found = poems.find((p) => p.id === +id);
  return found;
};

export default poems;
export { findPostById };
