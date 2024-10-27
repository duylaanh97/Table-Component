import React from 'react';
import {
  DetailsList,
  DetailsRow,
  Icon,
  IColumn,
  Panel,
  PanelType,
  SelectionMode,
  TextField,
  initializeIcons,
} from '@fluentui/react';
import { TableProps } from './tableProps';
import './App.css'
initializeIcons()

const Table: React.FC<TableProps> = ({
  items,
  columns,
  groups,
  groupable = false,
  sortable = true,
  searchable = true,
  searchPlaceholder = 'Tìm kiếm...',
  currentPage,
  totalPages,
  searchTerm,
  sortConfig,
  isFilterPanelOpen,
  panelHeader,
  searchTextFieldStyle,

  // Điều khiển icon Sort và Filter
  showSortIcon,
  showFilterIcon,

  // Callback và xử lý sự kiện
  onSearchChange,
  onSort,
  onPageChange,
  onToggleGroupCollapse,
  onOpenFilterPanel,
  onDismissFilterPanel,

  // Nội dung bộ lọc
  filterContent = <p>Bạn có thể thêm tùy chọn lọc ở đây...</p>,
}) => {
  // Hàm render hàng với màu nền xen kẽ
  const onRenderRow = (props: any) => {
    if (props) {
      const backgroundColor = props.itemIndex % 2 === 0 ? '#f9f9f9' : 'white';
      return <DetailsRow {...props} styles={{ root: { backgroundColor } }} />;
    }
    return null;
  };

  // Render tiêu đề nhóm với chức năng mở/đóng
  const onRenderGroupHeader = (group: any) => {
    if (!group) return <></>;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#f3f2f1',
          padding: '8px',
          cursor: 'pointer',
        }}
        onClick={() => onToggleGroupCollapse(group.group.key)}
      >
        <div>{group.group.name}</div>
        <Icon
          iconName={group.group.isCollapsed ? 'ChevronRight' : 'ChevronDown'}
          styles={{
            root: {
              fontSize: '10px',
              color: 'black',
            },
          }}
        />
      </div>
    );
  };

  // Tạo các cột với icon Sort và Filter mặc định
  const columnsWithIcons: IColumn[] = columns.map((col: any) => ({
    ...col,
    onRenderHeader: () => (
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => sortable && onSort && onSort(col.fieldName)}
      >
        <span>{col.name}</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {showFilterIcon && (
            <Icon
              iconName="Filter"
              onClick={(e) => {
                e.stopPropagation();
                onOpenFilterPanel && onOpenFilterPanel();
              }}
              styles={{
                root: { marginRight: 10, fontSize: '10px', color: 'black', cursor: 'pointer' },
              }}
            />
          )}
          {showSortIcon && (
            <>
              <Icon
                iconName="SortUp"
                styles={{
                  root: {
                    fontSize: '10px',
                    color: sortConfig.key === col.fieldName && sortConfig.direction === 'asc' ? 'black' : 'lightgray',
                  },
                }}
              />
              <Icon
                iconName="SortDown"
                styles={{
                  root: {
                    fontSize: '10px',
                    color: sortConfig.key === col.fieldName && sortConfig.direction === 'desc' ? 'black' : 'lightgray',
                  },
                }}
              />
            </>
          )}
        </div>
      </div>
    ),
  }));

  return (
    <div>
      {searchable && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginBottom: 10 }}>
          <div>{searchPlaceholder}</div>
          <TextField
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e: any) => onSearchChange(e.target.value)}
            style={searchTextFieldStyle}
            // style={{ width: '300px' }}
          />
        </div>
      )}

      <div className='table-container'>
        <DetailsList
          items={items}
          columns={columnsWithIcons}
          selectionMode={SelectionMode.none}
          onRenderRow={onRenderRow}
          groups={groupable ? groups : undefined}
          groupProps={groupable ? { onRenderHeader: onRenderGroupHeader } : undefined}
        />
      </div>

      <Panel
        isOpen={isFilterPanelOpen}
        onDismiss={onDismissFilterPanel}
        closeButtonAriaLabel="Đóng"
        headerText={panelHeader}
        type={PanelType.smallFixedFar}
        isLightDismiss={true}
      >
        {filterContent}
      </Panel>

      <div className="pagination-container">
        <button onClick={() => onPageChange(Math.max(currentPage - 1, 0))} disabled={currentPage === 0}>
          Preview
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={index === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))} disabled={currentPage === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
