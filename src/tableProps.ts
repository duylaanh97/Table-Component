import { IGroup } from '@fluentui/react';

export interface TableProps {
  // ------------------- Dữ liệu và cấu trúc bảng -------------------

  /**
   * Dữ liệu cho bảng, chứa các hàng cần hiển thị.
   */
  items: any[];

  /**
   * Cấu trúc cột của bảng, bao gồm thông tin về tên cột, tên trường dữ liệu và kích thước.
   */
  columns: any[];

  /**
   * Dữ liệu nhóm cho bảng, nếu có nhóm các hàng theo nhóm.
   */
  groups?: IGroup[];

  // ------------------- Tính năng điều khiển -------------------

  /**
   * Có cho phép nhóm dữ liệu hay không.
   */
  groupable?: boolean;

  /**
   * Có cho phép sắp xếp cột hay không.
   */
  sortable?: boolean;

  /**
   * Có cho phép tìm kiếm hay không. Nếu `true`, ô tìm kiếm sẽ hiển thị.
   */
  searchable?: boolean;

  /**
   * Placeholder cho ô tìm kiếm.
   */
  searchPlaceholder?: string;

  /**
 * Tiêu đề của panel bộ lọc.
 */
  panelHeader?: string;

  /**
   * Kiểu tùy chỉnh cho ô `TextField` tìm kiếm.
   */
  searchTextFieldStyle?: React.CSSProperties;

  // ------------------- Trạng thái phân trang và tìm kiếm -------------------

  /**
   * Trang hiện tại của bảng.
   */
  currentPage: number;

  /**
   * Tổng số trang có thể hiển thị.
   */
  totalPages: number;

  /**
   * Từ khóa tìm kiếm hiện tại.
   */
  searchTerm: string;

  /**
   * Cấu hình sắp xếp bao gồm tên cột hiện đang sắp xếp và hướng sắp xếp ('asc' hoặc 'desc').
   */
  sortConfig: any;

  /**
   * Trạng thái mở/đóng của panel bộ lọc.
   */
  isFilterPanelOpen: boolean;

  // ------------------- Điều khiển icon -------------------

  /**
   * Điều khiển hiển thị icon sắp xếp trên header của mỗi cột.
   */
  showSortIcon?: boolean;

  /**
   * Điều khiển hiển thị icon lọc trên header của mỗi cột.
   */
  showFilterIcon?: boolean;

  // ------------------- Callback -------------------

  /**
   * Callback khi từ khóa tìm kiếm thay đổi. Truyền vào từ khóa mới dưới dạng string.
   */
  onSearchChange: (searchTerm: string) => void;

  /**
   * Callback khi cột cần sắp xếp thay đổi. Nhận vào `columnKey` để biết cột nào đang sắp xếp.
   */
  onSort: (columnKey: string) => void;

  /**
   * Callback khi trang thay đổi. Nhận vào `page` là số trang mới.
   */
  onPageChange: (page: number) => void;

  /**
   * Callback để mở/đóng một nhóm dựa trên `groupKey`.
   */
  onToggleGroupCollapse: (groupKey: string) => void;

  /**
   * Callback để mở panel bộ lọc.
   */
  onOpenFilterPanel: () => void;

  /**
   * Callback để đóng panel bộ lọc.
   */
  onDismissFilterPanel: () => void;

  // ------------------- Nội dung tùy chỉnh -------------------

  /**
   * Nội dung của panel bộ lọc, cho phép tùy chỉnh nội dung bộ lọc.
   */
  filterContent?: JSX.Element;
}
