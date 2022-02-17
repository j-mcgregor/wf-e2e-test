import Script from 'next/script';

interface scriptloaderProps {
  url?: string;
  id?: string;
  type?: string;
  async?: boolean;
  defer?: boolean;
}
// Loads scripts intended for head by using the next/script
export const ScriptLoader = ({
  url,
  id,
  async = false,
  defer = false,
  type
}: scriptloaderProps) => {
  return (
    <>
      <Script async={async} defer={defer} id={id} type={type} src={url} />
    </>
  );
};
