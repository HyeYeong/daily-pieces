import { css, SerializedStyles } from "@emotion/react";
import React, { ChangeEvent, FC, useState, useEffect } from "react";
import { Title } from "@/components/atoms/Title";
import { Input } from "@/components/atoms/Input";
import { mediaQueries } from "@/styles/mixins/MediaQueries";
import { Select, OptionType } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/Button";
import ContentsWrap from "@/components/templates/ContentsWrap";
import { DailyDataItemType } from "@/helpers/common/DataTypes";
import { useDailyDatas } from "@/helpers/hooks/useDailyDatas";
import moment from "moment";

interface PropTypes {
  _css?: SerializedStyles | SerializedStyles[];
}

export const AddNewDailyData: FC<PropTypes> = ({ _css }) => {
  const { dailyDatas, setDailyDatas } = useDailyDatas();
  let [nextId] = useState(() => dailyDatas.length || 5);
  const [inputError, setInputError] = useState(false);
  const [today] = useState(moment());
  const ERROR_MSG = "내용이 입력되지 않았습니다. 내용을 입력해주세요.";
  const DEFAULT_REVIEW_DATA: DailyDataItemType = {
    id: nextId,
    title: "",
    comment: "",
    sort: "todo",
    score: 0,
    date: today.format("YYYY/M/D"),
  };

  const [inputData, setInputData] =
    useState<DailyDataItemType>(DEFAULT_REVIEW_DATA);

  const TAG_NAME = {
    todo: "할일",
    dairy: "일기",
    memo: "메모",
  } as const;

  // TODO: 여기 정리
  const [sortOptions] = useState<OptionType[]>(() => {
    let arr = [];
    arr.push({ label: "할일", value: "todo" });
    arr.push({ label: "일기", value: "dairy" });
    arr.push({ label: "메모", value: "memo" });
    return arr;
  });

  const [starScoreOptions] = useState<OptionType[]>(() => {
    let arr = [...Array(5)].map((_, index) => {
      const number = index + 1;
      return { label: `${number}점`, value: number };
    });
    arr.push({ label: "비워두기", value: 0 });
    return arr;
  });

  const resetInputs = () => setInputData(DEFAULT_REVIEW_DATA);
  const handleSubmit = (event: ChangeEvent<HTMLButtonElement>) => {
    if (inputData.title === "" || inputData.comment === "") {
      event.preventDefault();
      setInputError(true);
    } else {
      setDailyDatas(dailyDatas.concat(inputData));
      resetInputs();
    }
  };

  const setDate = () => {};

  useEffect(() => {
    window.localStorage.setItem("dailyDatas", JSON.stringify(dailyDatas));
  }, [dailyDatas]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { value, name } = event.target;
    setInputData({
      ...inputData,
      id: nextId,
      [name]: value,
    });
  };

  return (
    <ContentsWrap _css={styles.wrap}>
      <form>
        <Title element="H2" _css={styles.title}>
          하루 이야기
        </Title>

        <Title element="H4" _css={styles.subTitle}>
          제목
        </Title>
        <div>
          <Input
            placeholder={inputError ? ERROR_MSG : "제목을 입력해 주세요"}
            onChange={handleChange}
            value={inputData.title}
            name="title"
            _css={styles.input}
          />
        </div>

        <Title element="H4" _css={styles.subTitle}>
          내용
        </Title>
        <Input
          placeholder={inputError ? ERROR_MSG : "내용을 입력해 주세요"}
          onChange={handleChange}
          value={inputData.comment}
          name="comment"
          _css={styles.input}
        />

        <Title element="H4" _css={styles.subTitle}>
          분류
        </Title>
        <Select
          _css={styles.input}
          onChange={handleChange}
          value={inputData.sort}
          name="sort"
          selectOptions={sortOptions}
        />

        <Title element="H4" _css={styles.subTitle}>
          오늘 하루 만족도
        </Title>
        <Select
          _css={styles.input}
          onChange={handleChange}
          value={inputData.score}
          name="score"
          selectOptions={starScoreOptions}
        />
        <Button
          colorType={"cadetBlue"}
          onClick={(event: ChangeEvent<HTMLButtonElement>) =>
            handleSubmit(event)
          }
        >
          {"등록"}
        </Button>
      </form>
    </ContentsWrap>
  );
};

const styles = {
  wrap: css`
    padding: 0 15px;
    ${mediaQueries("md")} {
      width: calc(50% - 5px);
    }
  `,
  title: css`
    margin-bottom: 16px;
  `,
  subTitle: css`
    margin-bottom: 8px;
  `,
  input: css`
    margin-bottom: 18px;
  `,
};
