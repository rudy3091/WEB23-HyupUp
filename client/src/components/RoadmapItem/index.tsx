import React from 'react';
import S from './style';

interface RoadmapItemProps {
  columns: number;
  index: number;
  length: number;
}

const RoadmapItem = ({ columns, index, length }: RoadmapItemProps) => {
  return (
    <S.Container columns={columns}>
      {[...Array(columns)].map((_, i) => {
        if (i === index)
          return (
            <S.Bar>
              <S.FrontHandle />
            </S.Bar>
          );
        else if (i === index + length)
          return (
            <S.Bar>
              <S.RearHandle />
            </S.Bar>
          );
        else if (i < index + length && i > index) return <S.Bar />;
        else return <S.Spacer />;
      })}
    </S.Container>
  );
};

export default RoadmapItem;