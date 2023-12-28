export default {
  errorMessages: {
    alreadyExisting: (entity) => `${entity} already exists`,
    invalidCreds: "Invalid credentials",
  },
  successMessages: {
    deleted: (entity) => `${entity} deleted successfully`,
  },
};
