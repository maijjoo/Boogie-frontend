import SidebarLayout from "../../layouts/SidebarLayout";

const AdminMainPage = () => {
  return
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">이름</label>
          <input
            type="text"
            defaultValue="홍길동"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">연락처</label>
          <input
            type="text"
            defaultValue="051-123-456"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">이메일</label>
          <input
            type="email"
            defaultValue="boogionandon@gmail.com"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">근무처</label>
          <input
            type="text"
            defaultValue="부산광역시 영도구청"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">부서</label>
          <input
            type="text"
            defaultValue="해양수산과"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-between">
          <button className="bg-white text-blue-600 border border-blue-600 rounded-md px-4 py-2 hover:bg-blue-50">
            비밀번호 변경
          </button>
          <button className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700">
            내 정보 수정
          </button>
        </div>
        <div className="mt-4 text-center">
          <a href="#" className="text-gray-500 hover:text-gray-700">
            로그아웃
          </a>
        </div>
      </div>
    </div>
  );
};
  <SidebarLayout />;
};

export default AdminMainPage;
