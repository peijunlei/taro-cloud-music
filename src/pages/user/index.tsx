import React, { useEffect, useRef, useState } from 'react';
import { Button, ScrollView, Text, View } from '@tarojs/components';
import { useRequest } from 'taro-hooks';

interface Result {
  list: string[];
  nextId: number|undefined;
}

const resultData = Array.from(Array(999).keys())

function getLoadMoreList(nextId: number | undefined, limit: number): Promise<Result> {

  let start = 0;
  if (nextId) {
    start = resultData.findIndex((i) => i === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end);
  const nId = resultData.length >= end ? resultData[end] : undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId,
      });
    }, 1000);
  });
}

export default () => {
  const ref = useRef();
  const [val, setValue] = useState('');
  const { data, loading, loadMore, loadingMore, noMore, reload, run } = useRequest(
    (d) => {
      return getLoadMoreList(d?.nextId, 20)
    },
    {
      manual: true,
      loadMore: true,
      ref: ref,
      isNoMore: (d) => d?.nextId === undefined,
      formatResult: (r) => ({
        list: r.list,
        nextId: r.nextId,
        total: r.list.length
      })
    },
  );
  useEffect(()=>{
    reload()
  },[])
  return (
    <ScrollView ref={ref} style={{ height: '100vh', border: '1px solid red' }} scrollY >
      {
          (
          <View>
            {loading ? (
              <Text>loading</Text>
            ) : (
              <View>
                {data?.list?.map((item) => (
                  <View key={item} style={{ padding: 12, border: '1px solid #f5f5f5' }}>
                    item-{item}
                  </View>
                ))}
              </View>
            )}

            <View style={{ marginTop: 8 }}>
              {!noMore && (
                <Text>
                  {loadingMore &&'Loading more...'}
                </Text>
              )}

              {noMore && <Text>No more data</Text>}
            </View>
          </View>
        )
      }

    </ScrollView>
  );
};