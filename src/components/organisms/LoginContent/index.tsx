import { css, SerializedStyles } from "@emotion/react";
import React, { FC, useState } from "react";
import { Title } from "@/components/atoms/Title";
import ContentsWrap from "@/components/templates/ContentsWrap";
import { mediaQueries } from "@/styles/mixins/MediaQueries";
import { COLORS } from "@/styles/variables/Colors";
import { Input } from "@/components/atoms/Input";

interface PropTypes {
  _css?: SerializedStyles | SerializedStyles[];
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginContent: FC<PropTypes> = ({
  _css,
  setIsLogin
}) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    if (id === "hyeyeong" && password === "1234") {
      sessionStorage.setItem("isLogin", "true");
      setIsLogin(true);
    }
  }

  return (
    <ContentsWrap _css={styles.wrap}>
      <Title element="H2" _css={styles.title}>
        Daily pieces
      </Title>
      <form css={styles.cardsBlock} onSubmit={handleLogin}>
        <Input name="id" type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <Input name="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" css={styles.loginButton}>로그인</button>
      </form>
    </ContentsWrap>
  );
};

const styles = {
  wrap: css`
    padding: 0 15px;
    background-color: ${COLORS.GRAY[1]};
    width: 400px;
    margin: 100px auto !important;
    ${mediaQueries("md")} {
      padding-top: 0;
      box-sizing: border-box;
      background-color: transparent;
    }
  `,
  cardsBlock: css`
    ${mediaQueries("md")} {
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 10px;      
    }
  `,
  title: css`
    margin-bottom: 16px;
  `,
  loginButton: css`
    padding: 6px 12px;
    border-radius: 4px;
    font-weight: bold;
    border: 1px solid ${COLORS.CADET_BLUE};
    background-color: ${COLORS.CADET_BLUE};
    color: white;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    
    &:hover {
      background-color: white;
      color: ${COLORS.CADET_BLUE};
    }
  `,
};
