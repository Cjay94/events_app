// ====== USER PARAMS  ====== //
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== EVENT PARAMS  ====== //
export type EventFormProps = {
  userId: string;
  type: "Create" | "Update";
};

// ====== CATEGORY PARAMS  ====== //
export type CreateCategoryParams = {
  categoryName: string;
};
