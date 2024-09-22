import { Link, useNavigate } from 'react-router-dom';
import { useDeletePostById, useGetPostsByUserId } from '../query/postQuery';
import useUserStore from '../stores/useUserStore';

const Mypage = () => {
  const { user } = useUserStore();
  const { user_id } = user;

  const { data, isError, isSuccess, isPending } = useGetPostsByUserId(user_id);
  const { mutate } = useDeletePostById();
  const navigate = useNavigate();
  const handleMoveToDetail = (postId) => {
    navigate(`/detail/${postId}`);
  };

  if (isSuccess) {
    console.log('data성공', data);
  }
  if (isError) {
    console.log('에러');
  }
  if (isPending) {
    return <div>로딩 중..</div>;
  }

  return (
    <div className='flex flex-col'>
      <body className='flex flex-col px-10 gap-12'>
        <div className='border-f5f5f5 border-b-8 pb-5 w-11/12 h-48 pt-5 flex gap-10 items-center '>
          <div className='rounded-full w-32 h-32 bg-black'></div>
          <div className='flex flex-col gap-3'>
            <p className='text-2xl font-semibold'>{user.nickname}</p>
            <p className=' '>{user.user_id}</p>
          </div>
        </div>

        <div className='flex gap-5'>
          <div className='flex flex-col gap-3'>
            <p className='text-xl font-omyu_pretty font-extrabold'>내 장소</p>
            <div className='flex'>
              {data?.map((item) => (
                <div
                  className='flex w-1/6 flex-col'
                  key={item.id}
                  onClick={() => {
                    handleMoveToDetail(item.id);
                  }}
                >
                  <img
                    className=' bg-neutral-200  rounded-t-lg'
                    src={item.img_url}
                  />
                  <div className=' bg-neutral-200 h-20 rounded-b-lg'>
                    <p className='pl-2'>{item.address.split(' ')[0]}</p>
                    <p className='pl-2'>{item.address.split(' ')[1]}</p>
                    <div className='flex justify-around'>
                      <div>{item.tag.join(', ')}</div>
                      <button
                        className='bg-blue-950 text-white w-12 rounded-md'
                        onClick={() => {
                          mutate({ postId: item.id, userId: user_id });
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-xl font-bold font-omyu_pretty'>좋아요한 장소</p>
            <div className='flex gap-5'>
              {data?.map((item) => (
                <div
                  className='flex w-1/6 flex-col'
                  key={item.id}
                >
                  <img
                    className=' bg-neutral-200 rounded-t-lg'
                    src={item.img_url}
                  />
                  <div className=' bg-neutral-200 h-20 rounded-b-lg'>
                    <p className='pl-2'>지역</p>
                    <p className='pl-2'>구</p>
                    <div className='flex justify-around'>
                      <div>{item.tag}</div>
                      <button className='bg-blue-950 text-white w-12 rounded-md'>삭제</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Mypage;
