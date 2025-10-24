export default function Avatar({ author, size = 40, className = "" }) {
  const name = author?.username || author?.name || "User";
  const url =
    author?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

  return (
    <img
      src={url}
      alt={`${name} avatar`}
      width={size}
      height={size}
      className={`avatar ${className}`}
    />
  );
}
