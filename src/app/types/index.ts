export interface Student {
  id: number;
  surname: string;
  firstname: string;
  age: number;
  gender: string;
  level: string;
  state: string;
}
export interface FiltersFormProps {
  onFilter: (filters: FilterParams) => void;
}

export interface FilterParams {
  age?: string;
  state?: string;
  level?: string;
  gender?: string;
}

export interface Student {
  id: number;
  surname: string;
  firstname: string;
  age: number;
  gender: string;
  level: string;
  state: string;
}

export interface StudentsTableProps {
  data: Student[];
  loading: boolean;
}
