export const Footer = () => {
  return (
    <footer className="p-4 text-center print:hidden">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Designed and Developed by{' '}
        <a
          href="https://github.com/bravetux"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary hover:underline"
        >
          Bravetux
        </a>
      </p>
    </footer>
  );
};