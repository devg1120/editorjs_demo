import "./style.css";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import NestedList from "@editorjs/nested-list";

import Table from "@editorjs/table";
import Marker from "@editorjs/marker";
import Underline from "@editorjs/underline";
import InlineCode from "@editorjs/inline-code";

import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Code from "@editorjs/code";
import ColorPlugin from "editorjs-text-color-plugin";

// https://github.com/rizki4106/editorjs-viewer
import { parser } from "editorjs-viewer";

// https://github.com/miadabdi/editorjs-parser
import edjsParser from "editorjs-parser";
let json_data2 = {
  time: 1694155961439,
  blocks: [
    {
      id: "oUq2g_tl8y",
      type: "header",
      data: {
        text: "Editor.js",
        level: 2,
      },
    },
    {
      id: "zbGZFPM-iI",
      type: "paragraph",
      data: {
        text: 'Hey. M<font style="color: rgb(236, 120, 120);">eet the new Ed</font>itor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of co<font style="color: rgb(0, 188, 212);">nnection a</font>nd configuration.',
      },
    },
    {
      id: "qYIGsjS5rt",
      type: "header",
      data: {
        text: "Key features",
        level: 3,
      },
    },
    {
      id: "XV87kJS_H1",
      type: "list",
      data: {
        style: "unordered",
        items: [
          "It is a block-styled editor",
          "It returns clean data output in JSON",
          "Designed to be extendable and pluggable with a simple API",
        ],
      },
    },
    {
      id: "AOulAjL8XM",
      type: "header",
      data: {
        text: "What does it mean «block-styled editor»",
        level: 3,
      },
    },
    {
      id: "cyZjplMOZ0",
      type: "paragraph",
      data: {
        text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
      },
    },
  ],
  version: "2.28.0",
};

let json_data = {
  time: 1550476186479,
  blocks: [
    {
      id: "oUq2g_tl8y",
      type: "header",
      data: {
        text: "Editor.js",
        level: 2,
      },
    },
    {
      id: "zbGZFPM-iI",
      type: "paragraph",
      data: {
        text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.",
      },
    },
    {
      id: "qYIGsjS5rt",
      type: "header",
      data: {
        text: "Key features",
        level: 3,
      },
    },
    {
      id: "XV87kJS_H1",
      type: "list",
      data: {
        style: "unordered",
        items: [
          "It is a block-styled editor",
          "It returns clean data output in JSON",
          "Designed to be extendable and pluggable with a simple API",
        ],
      },
    },
    {
      id: "AOulAjL8XM",
      type: "header",
      data: {
        text: "What does it mean «block-styled editor»",
        level: 3,
      },
    },
    {
      id: "cyZjplMOZ0",
      type: "paragraph",
      data: {
        text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
      },
    },
  ],
  version: "2.8.1",
};

const editor = new EditorJS({
  /**
   * Id of Element that should contain the Editor
   */
  holder: "editorjs",

  tools: {
    header: Header,
    list: List,
    nestedlist: NestedList,
    checklist: Checklist,
    quote: Quote,
    code: Code,
    marker: Marker,
    underline: Underline,
    inline_code: InlineCode,
    table: {
      class: Table,
      inlineToolbar: true,
      config: {
        rows: 2,
        cols: 3,
      },
    },
    Color: {
      class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
      config: {
        colorCollections: [
          "#EC7878",
          "#9C27B0",
          "#673AB7",
          "#3F51B5",
          "#0070FF",
          "#03A9F4",
          "#00BCD4",
          "#4CAF50",
          "#8BC34A",
          "#CDDC39",
          "#FFF",
        ],
        defaultColor: "#FF1300",
        type: "text",
        customPicker: true, // add a button to allow selecting any colour
      },
    },
  },

  //data: json_data,
  data: json_data2,
});

document.querySelector("#save").onclick = () => {
  editor
    .save()
    .then((outputData) => {
      document.querySelector("textarea").value = JSON.stringify(
        outputData,
        null,
        "\t",
      );
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
};

document.querySelector("#view1_exec").onclick = () => {
  editor
    .save()
    .then((outputData) => {
      const result = parser.toHTML(outputData.blocks, conf);
      document.querySelector("#view1").innerHTML = result;
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
};

document.querySelector("#view2_exec").onclick = () => {
  editor
    .save()
    .then((outputData) => {
      const parser2 = new edjsParser(undefined, undefined);
      const result2 = parser2.parse(outputData);
      document.querySelector("#view2").innerHTML = result2;
    })
    .catch((error) => {
      console.log("Saving failed: ", error);
    });
};

// define custom configuration
const conf = {
  // naming must be in lower case and can not be combined
  list: {
    onReturn(value) {
      console.log(value.data.type);
      console.log(value.data.items.length);
      console.log(value.data.items[0]);

      let html = "<ul>";

      for (let i = 0; i < value.data.items.length; i++) {
        html += "<li>";
        html += value.data.items[i];
        html += "</li>";
      }

      html += "</ul>";

      //return "<pre>list</pre>";
      return html;
    },
  },
};

const result = parser.toHTML(json_data2.blocks, conf);

document.querySelector("#view1").innerHTML = result;

const parser2 = new edjsParser(undefined, undefined);

//const result2 = parser2.parse(json_data.blocks )
const result2 = parser2.parse(json_data2);

document.querySelector("#view2").innerHTML = result2;

/*

document.querySelector('#view').innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`
*/
