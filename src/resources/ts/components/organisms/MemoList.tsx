import React, { FC } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import MemoListHeader from '../molecules/MemoListHeader';
import MemoListItem from '../molecules/MemoListItem';
import MemoListItemSkeleton from '../molecules/MemoListItemSkeleton';
import { INTERNAL_SERVER_ERROR } from '../../constants/statusCode';
import { Memos } from '../../models/Memos';

type Props = {
  paginateMemos?: Memos[];
  isLoading: boolean;
  statusCode?: number;
  loadMoreRef: (node: Element) => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  handleAddMemo: VoidFunction;
  handleSelectItem: (memoId: string) => void;
};

const MemoList: FC<Props> = ({
  paginateMemos,
  isLoading,
  statusCode,
  loadMoreRef,
  hasNextPage,
  isFetchingNextPage,
  handleAddMemo,
  handleSelectItem,
}) => {
  if (isLoading) {
    return (
      <>
        <Box height={48} px={2} />
        {[1, 2, 3, 4, 5].map((value) => (
          <MemoListItemSkeleton key={value} />
        ))}
      </>
    );
  }

  if (statusCode) {
    return (
      <>
        <Box height={48} px={2} />
        {statusCode === INTERNAL_SERVER_ERROR && (
          <Alert severity="error">
            <AlertTitle>サーバエラー</AlertTitle>
            予期しないエラーが発生し、メモデータ取得に失敗しました。恐れ入りますが時間をおいて再度お試しください。
          </Alert>
        )}
      </>
    );
  }

  let loadMoreMessage;
  if (isFetchingNextPage) {
    loadMoreMessage = '読み込み中...';
  } else {
    loadMoreMessage = hasNextPage ? '続きを読み込む' : ' ';
  }

  return (
    <>
      <MemoListHeader handleAddMemo={handleAddMemo} />
      <List style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'scroll' }}>
        {paginateMemos?.map((page) => (
          <React.Fragment key={page.currentPage}>
            {page.data.map((memo) => (
              <MemoListItem
                key={memo.memoId}
                memoId={memo.memoId}
                title={memo.title}
                content={memo.content}
                handleSelectItem={handleSelectItem}
              />
            ))}
          </React.Fragment>
        ))}
        <Box {...{ ref: loadMoreRef }} textAlign="center">
          {loadMoreMessage}
        </Box>
      </List>
    </>
  );
};

export default MemoList;