// ______________________________________________________
// popupで表示
import React from "react";
import styled from "styled-components";
import { useCopyMessage } from "./hook/useCopyMessage";
// ______________________________________________________
//
type Props = {};

const Component: React.FC<Props> = (props) => {
  const { fn, text, loading } = useCopyMessage();
  React.useEffect(() => {
    fn.get();
  }, []);

  const errDom = (
    <div className="error">
      <div>
        エラー: <button onClick={fn.get}>retry</button>
      </div>
      <div>{loading.err}</div>
    </div>
  );
  return (
    <div {...props}>
      {loading.state ? <div>取得中...</div> : ""}
      {(!loading.state && !loading.err.length && text.length && (
        <div>コピーしました!</div>
      )) ||
        ""}
      {(loading.err.length && errDom) || ""}
    </div>
  );
};

// ______________________________________________________
//
export default styled(Component)`
  min-width: 10rem;
  color: #eee;
  background-color: #11111144;
  padding: 1rem 0.75rem;

  border-radius: 0.5rem;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    border-bottom: 1px solid #aaa;
  }

  .error {
    & > * {
      padding: 0.25rem;
    }

    font-size: 0.8rem;
  }

  * {
    box-sizing: border-box;
  }
`;
