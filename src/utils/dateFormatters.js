export const formatExpiryDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  return `${day} ${month}`;
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const pad = (num) => num.toString().padStart(2, "0");

  return `${day} ${month} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};
