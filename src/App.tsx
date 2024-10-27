import React, { useState } from 'react';
import { IGroup } from '@fluentui/react';
import Table from './Table';

const initialItems = [
  { key: 1, name: 'Item 1', value: 10 },
  { key: 2, name: 'Item 2', value: 20 },
  { key: 3, name: 'Item 3', value: 30 },
  { key: 4, name: 'Item 4', value: 40 },
];

const initialGroups: IGroup[] = [
  { key: 'group1', name: 'Nhóm 1', startIndex: 0, count: 2, isCollapsed: false },
  { key: 'group2', name: 'Nhóm 2', startIndex: 2, count: 2, isCollapsed: false },
];

const App = () => {
  // State quản lý dữ liệu bảng
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<any>({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [groups, setGroups] = useState(initialGroups);

  // Hàm xử lý tìm kiếm
  const handleSearchChange = (searchValue: string) => {
    setSearchTerm(searchValue);

    const filteredItems = initialItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.key.toString().includes(searchValue) ||
        item.value.toString().includes(searchValue)
    );

    setItems(filteredItems);
  };

  // Hàm xử lý sắp xếp
  const handleSort = (columnKey: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedItems = [...items].sort((a: any, b: any) => {
      if (a[columnKey] < b[columnKey]) return direction === 'asc' ? -1 : 1;
      if (a[columnKey] > b[columnKey]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setItems(sortedItems);
    setSortConfig({ key: columnKey, direction });
  };

  // Hàm xử lý chuyển trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Hàm xử lý mở panel lọc
  const openFilterPanel = () => {
    setIsFilterPanelOpen(true);
  };

  // Hàm xử lý đóng panel lọc
  const dismissFilterPanel = () => {
    setIsFilterPanelOpen(false);
  };

  // Hàm xử lý mở/đóng nhóm
  const toggleGroupCollapse = (groupKey: string) => {
    const updatedGroups = groups.map(group => {
      if (group.key === groupKey) {
        return { ...group, isCollapsed: !group.isCollapsed };
      }
      return group;
    });
    setGroups(updatedGroups);
  };

  // Định nghĩa cột cho bảng
  const columns = [
    { key: 'column1', name: 'Key', fieldName: 'key', minWidth: 100, maxWidth: 200 },
    { key: 'column2', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200 },
    { key: 'column3', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200 },
  ];

  return (
    <div>
      <h1>Table Component</h1>

      <Table
        items={items.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)}
        columns={columns}
        groups={groups}
        groupable={false}
        sortable={true}
        searchable={true}
        searchPlaceholder="Search..."
        panelHeader="Hello"
        searchTextFieldStyle={{ width: '300px' }}

        showFilterIcon
        showSortIcon
        
        // State và giá trị khác
        currentPage={currentPage}
        totalPages={totalPages}
        searchTerm={searchTerm}
        sortConfig={sortConfig}
        isFilterPanelOpen={isFilterPanelOpen}
        
        // Callback và xử lý sự kiện
        onSearchChange={handleSearchChange}
        onSort={handleSort}
        onPageChange={handlePageChange}
        onToggleGroupCollapse={toggleGroupCollapse}
        onOpenFilterPanel={openFilterPanel}
        onDismissFilterPanel={dismissFilterPanel}
        
        // Nội dung bộ lọc
        filterContent={<p>Nội dung bộ lọc tùy chỉnh ở đây...</p>}
      />
    </div>
  );
};

export default App;
