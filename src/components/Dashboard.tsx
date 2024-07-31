import React, { useEffect } from "react";
import { fetchItemsAsync, deleteItemAsync } from "../features/items/itemsSlice";
import { useAppDispatch, useAppSelector } from "../hook";
import { Button } from "./ui/shad-cn/button";
import EditIcon from "./assets/svg/EditIcon";
import DeleteIcon from "./assets/svg/DelelteIcon";
import UserIcon from "./assets/svg/UserIcon";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.items);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteItemAsync(id));
  };

  return (
    <div className="relative h-[100vh] flex">
      <div className="fixed bg-divider w-[250px] border-r border-stroke z-10 h-[100vh]">
        <h1 className="text-blue-primary text-center font-[700] pt-[100px] text-[34px]">
          Kiber technology
        </h1>
      </div>
      <div className="flex-1 ml-[250px] overflow-auto p-4">
        {user && (
          <div className="flex items-center justify-end">
            <UserIcon className="fill-gray border border-gray rounded-[50%] w-[22px] h-[22px]" />
            <p className="font-[600] ms-[4px] text-[18px]">{user.username}</p>
          </div>
        )}
        <div className="border-b border-stroke pt-[20px] pb-[10px] flex items-center justify-between">
          <h2 className="text-blue-primary font-[700] text-[28px]">
            Список продуктов
          </h2>
          <Button
            variant={"ghost"}
            className="bg-blue-primary text-light w-[100px] py-[8px] rounded-[6px]"
          >
            <Link
              to="/dashboard/add"
              className="w-full h-full flex items-center justify-center text-light no-underline"
            >
              Добавить
            </Link>
          </Button>
        </div>
        {loading && (
          <p className="py-[20px] text-[22px] font-[600] text-red-primary">
            Загрузка...
          </p>
        )}
        {error && <p>{error}</p>}
        <table className="min-w-full bg-white border border-stroke rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b border-stroke">
              <th className="py-2 px-4 text-left text-gray-600">Название</th>
              <th className="py-2 px-4 text-left text-gray-600">Цена</th>
              <th className="py-2 px-4 text-left text-gray-600">Изображение</th>
              <th className="py-2 px-4 text-gray-600 text-center">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-stroke">
                <td className="py-2 px-4">{item.title}</td>
                <td className="py-2 px-4">{item.price}</td>
                <td className="py-2 px-4">
                  <img
                    className="w-[50px] h-[50px] object-contain"
                    src={item.thumbnail}
                    alt={item.title}
                  />
                </td>
                <td className="pt-[20px] px-4 flex justify-center space-x-2">
                  <Link to={`/dashboard/edit/${item.id}`}>
                    <Button
                      variant={"ghost"}
                      className="px-[12px] w-[46px] h-[40px] rounded-[12px] flex items-center justify-center bg-blue-primary hover:bg-[#1a1d50]"
                    >
                      <EditIcon className="fill-light" />
                    </Button>
                  </Link>
                  <Button
                    variant={"ghost"}
                    onClick={() => handleDelete(item.id)}
                    className="px-[12px] w-[46px] h-[40px] rounded-[12px] flex items-center justify-center bg-red-primary hover:bg-[#f00]"
                  >
                    <DeleteIcon className="fill-light" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
