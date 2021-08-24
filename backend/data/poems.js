let poems = [
  {
    id: "0",
    title: "Welcome to poem Social",
    author: "Van Nguyen Nguyen",
    text: '# Welcome to `poemSocial`\nThis is going to be an introduction to some features in the app.\n\n## Syntax highlighinting\n```js\nimport React from "react" ;\nconst Introduction = () => {\n\treturn(\n\t\t<>\n \t   \t\t<h1>Hello World!</h1>\n\t\t</>    \n\t)\n}\n```\n\n## GitHub flavored markdown (GFM)\n\nWe use remark-gfm for rendering content:\n[`remark-gfm`](https://github.com/remarkjs/react-markdown#use).\nIt adds support for GitHub-specific extensions to the language:\ntables, strikethrough, tasklists, and literal URLs.\n\n\n| Feature    | Support              |\n| ---------: | :------------------- |\n| CommonMark | 100%                 |\n| GFM        | 100% w/ `remark-gfm` |\n\n~~strikethrough~~\n\n* [ ] task list\n* [x] checked item\n\nhttps://example.com\n\n## Uploading Image\nWe having feature that allow you to uploading your image. We will give you back the image link for you to embbed in the poem.\n\n![image](/uploads/image-1629704936467.png)\n\nClicking **Choose file** to choose your image (we only accept image, other file type wont be able to be uploaded). After that we will give you the link of the image (already covered in markdown syntax).  \nClick **copy** to copy the link and paste it in your poem.\n\nAuthor: [Van Nguyen Nguyen](https://github.com/hades42)\n\n\n',
    votes: 0,
    createdAt: "2021-08-23T07:59:54.115Z",
  },
];

const findPostById = (id) => {
  const found = poems.find((p) => p.id === id);
  return found;
};

const upVoteById = (id) => {
  for (let i = 0; i < poems.length; i++) {
    if (poems[i].id === id) {
      poems[i].votes += 1;
      return poems[i].votes;
    }
  }
};

const deVoteById = (id) => {
  for (let i = 0; i < poems.length; i++) {
    if (poems[i].id === id) {
      poems[i].votes -= 1;
      return poems[i].votes;
    }
  }
};

const createNewData = (data) => {
  poems.push(data);
  return data;
};

export default poems;
export { findPostById, upVoteById, deVoteById, createNewData };
