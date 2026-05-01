import { COLORS } from "@/styles/variables/Colors";
import { css, SerializedStyles } from "@emotion/react";
import React, { FC, MouseEvent, useEffect, useState } from "react";
import { useDailyDatas } from "@/helpers/hooks/useDailyDatas";
import Icon from "@/components/atoms/Icon";
import { DailyDataItemType } from "@/helpers/common/DataTypes";
import { ButtonType } from "@/constants/button";

import {
  MINUS_CLASS_NAME,
  MINUS_HOVER_CLASS_NAME,
  PENCIL_CLASS_NAME,
  PENCIL_HOVER_CLASS_NAME,
} from "@/styles/variables/Icons";

interface PropTypes {
  buttonType: ButtonType;
  iconColor?: string;
  isHover?: boolean;
  itemId?: number | string;
  _css?: SerializedStyles | SerializedStyles[];
  sortingArr: DailyDataItemType[];
  setSortingArr: React.Dispatch<React.SetStateAction<DailyDataItemType[]>>;
  isEditMode?: boolean;
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>;
  onSave?: () => void;
}

export const CardControlButton: FC<PropTypes> = ({
  _css,
  iconColor = COLORS.CADET_BLUE,
  isHover = false,
  buttonType,
  itemId,
  sortingArr,
  setSortingArr,
  isEditMode,
  setIsEditMode,
  onSave,
}) => {
  const { setDailyDatas } = useDailyDatas();
  const [isLastData, setIsLastData] = useState(false);

  const iconType = (bType: ButtonType) => {
    switch (bType) {
      case "EDIT":
        return {
          class: PENCIL_CLASS_NAME,
          hoverClass: PENCIL_HOVER_CLASS_NAME,
        };
      case "DELETE":
        return {
          class: MINUS_CLASS_NAME,
          hoverClass: MINUS_HOVER_CLASS_NAME,
        };
      case "SAVE":
        return {
          class: "fa fa-check",
          hoverClass: "fa fa-check-square",
        };
    }
  };

  const setIcon = (bType: ButtonType) => {
    return (
      <Icon
        classNames={iconType(bType).class}
        hoverClassNames={iconType(bType).hoverClass}
        iconColor={iconColor}
        isHover={isHover}
      />
    );
  };

  useEffect(() => {
    if (sortingArr.length === 1) setIsLastData(true);
    setDailyDatas(() => sortingArr);
  }, [sortingArr]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (buttonType === 'EDIT') {
      handleEdit(event)
    } else if (buttonType === 'SAVE') {
      if (onSave) onSave();
    } else {
      handleDelete(event)
    }
  };

  const handleEdit = (event: MouseEvent<HTMLButtonElement>) => {
    if (setIsEditMode) {
      setIsEditMode(true);
    }
  };

  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    const targetId = itemId ? Number(itemId) : parseInt(event.currentTarget.offsetParent!.id, 10);
    if (isLastData) window.localStorage.removeItem("dailyDatas");
    return setSortingArr(sortingArr.filter((data) => data.id !== targetId));
  };

  return (
    <button
      onClick={handleClick}
      css={[styles.iconButtonReset, _css]}
    >
      {setIcon(buttonType)}
    </button>
  );
};

const styles = {
  iconButtonReset: css`
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
  `,
};
