import React, { useState } from "react";

function CreateButton({ onClickButton }) {
    return <button onClick={onClickButton}>글 작성</button>;
}

function UpdateButton({ onClickButton }) {
    return <button onClick={onClickButton}>글 수정</button>;
}

function DeleteButton({ onClickButton }) {
    return <button onClick={onClickButton}>글 삭제</button>;
}

function Create({ onCreate }) {
    return (
        <article>
            <h2>글 작성</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.title.value;
                    const body = event.target.body.value;
                    onCreate(title, body);
                }}
            >
                <p>제목</p>
                <p>
                    <input type="text" name="title" placeholder="title" />
                </p>
                <p>내용</p>
                <p>
                    <textarea name="body" placeholder="body" />
                </p>
                <p>
                    <input type="submit" value="작성 완료" />
                </p>
            </form>
        </article>
    );
}

function Update({ onUpdate, toUpdateContent, index }) {
    const [title, setTitle] = useState(toUpdateContent.title);
    const [body, setBody] = useState(toUpdateContent.body);
    return (
        <article>
            <h2>글 수정</h2>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const title = event.target.title.value;
                    const body = event.target.body.value;
                    onUpdate(title, body, index);
                }}
            >
                <p>제목</p>
                <p>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </p>
                <p>내용</p>
                <p>
                    <textarea
                        name="body"
                        placeholder="body"
                        value={body}
                        onChange={(event) => setBody(event.target.value)}
                    />
                </p>
                <p>
                    <input type="submit" value="수정 완료" />
                </p>
            </form>
        </article>
    );
}

export default function App() {
    const [contents, setContents] = useState([{ title: "abc", body: "def" }]);
    const [crudState, setCrudState] = useState("WELCOME");
    const [selected, setSelected] = useState(0);

    const listContents = contents.map((content, i) => (
        <li
            key={i}
            onClick={() => selectedHandler(i)}
            style={{
                color: selected === i ? "red" : "black",
            }}
        >
            {content.title}
        </li>
    ));

    function buttonHandler(crud) {
        setCrudState(crud);
    }

    function selectedHandler(i) {
        setSelected(i);
    }

    function onCreateButton(title, body) {
        const newContent = { title: title, body: body };
        const newContents = [...contents];
        newContents.push(newContent);
        setContents(newContents);
    }

    function onUpdateButton(title, body, index) {
        const newContent = { title: title, body: body };
        const newContents = [...contents];
        newContents[index] = newContent;
        setContents(newContents);
    }

    function onDeleteButton() {
        const newContents = [...contents];
        newContents.splice(selected, 1);
        setCrudState("NONE");
        setSelected(0);
        setContents(newContents);
    }

    function Content() {
        if (crudState === "CREATE") {
            return <Create onCreate={onCreateButton} />;
        } else if (crudState === "UPDATE") {
            return (
                <Update
                    onUpdate={onUpdateButton}
                    toUpdateContent={contents[selected]}
                    index={selected}
                />
            );
        }
    }

    return (
        <div>
            <h1>React CRUD Project</h1>
            <div>
                <div>
                    <h2>글 목록</h2>
                    <ol>{listContents}</ol>
                </div>
                <div>
                    <h2>글 내용</h2>
                    <a>{contents[selected].body}</a>
                </div>
                <div>
                    <Content />
                    <CreateButton
                        onClickButton={() => buttonHandler("CREATE")}
                    />
                    <UpdateButton
                        onClickButton={() => buttonHandler("UPDATE")}
                    />
                    <DeleteButton
                        onClickButton={onDeleteButton}
                    />
                </div>
            </div>
        </div>
    );
}
