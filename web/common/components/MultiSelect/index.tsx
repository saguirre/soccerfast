export const MultiSelect: React.FC<Props> = ({ }) => {
    return <div
    onMouseLeave={handleMouseLeave}
    onMouseEnter={handleMouseEnter}
    className="col-span-12 flex flex-col items-center h-32 mx-auto"
  >
    <div className="w-full">
      <div className="flex flex-col items-center relative">
        <div className="w-full">
          <div
            ref={selectRef}
            onClick={() => setSelectOpen((current) => !current)}
            className="my-2 p-1 flex border border-gray-300 shadow-sm bg-white rounded-md"
          >
            <div className="flex flex-auto flex-wrap">
              {selectedUsers?.map((user: User, index: number) => (
                <div
                  key={index}
                  className="flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-sky-500 ring-1 ring-sky-500 "
                >
                  <div className="text-xs font-normal leading-none max-w-full flex-initial">
                    {user?.name}
                  </div>
                  <div className="flex flex-auto flex-row-reverse">
                    <div onClick={(event) => handleRemoveUser(event, user)}>
                      <XIcon className="feather feather-x cursor-pointer text-sky-500 hover:text-sky-400 rounded-full w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex-1">
                <input
                  value={searchString}
                  onChange={handleSearchStringChange}
                  placeholder={'Escribe para buscar entre los usuarios...'}
                  className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800 placeholder:text-gray-300 placeholder:text-base "
                />
              </div>
            </div>
            <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
              <button className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                {selectOpen ? (
                  <ChevronUpIcon className="feather feather-chevron-up w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="feather feather-chevron-up w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        {selectOpen && (
          <div className="absolute shadow mt-14 bg-white z-40 w-full left-0 rounded max-h-select overflow-y-auto svelte-5uyqqj">
            <div className="flex flex-col w-full">
              {filteredUsers?.map((user: User, index: number) => (
                <div
                  key={index}
                  onClick={() => handleUserSelection(user)}
                  className="cursor-pointer w-full border-gray-100 rounded-b hover:bg-sky-100"
                >
                  <div
                    className={classNames(
                      selectedUsers.some((selectedUser: User) => user.id === selectedUser.id)
                        ? 'border-l-4 border-sky-500'
                        : '',
                      'flex w-full items-center p-2 pl-2 border-transparent  relative '
                    )}
                  >
                    <div className="w-full items-center flex">
                      <div className="mx-2 leading-6  ">{user?.name} </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
}