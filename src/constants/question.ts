export const QuestionTypeEnum = {
  SIMPLE: 0,
  COMPLEX: 1,
  SINGLE: 2,
  MULTIPLE: 3,
  DROP_DOWN: 4,
};

export const NonOptionQuestionTypes = [QuestionTypeEnum.SIMPLE, QuestionTypeEnum.COMPLEX];

export const OptionQuestionTypes = [QuestionTypeEnum.SINGLE, QuestionTypeEnum.MULTIPLE, QuestionTypeEnum.DROP_DOWN];
