import { ApplicationError } from './ApplicationError';

export const ErrorBox = ({
  error
}: {
  error: { error: string; message: string | string[] | object };
}) => {
  // eslint-disable-next-line no-console
  console.log('Error Box', error);
  let message: string | React.ReactNode = '';
  switch (typeof error.message) {
    case 'string':
      // TODO: check for JSON when other branch merged
      message = error.message;
      break;
    case 'object':
      if (Array.isArray(error.message)) {
        const api422response: Array<{ msg: string; location: string }> =
          error.message.map((e: any) => ({
            msg: `${e.msg}.`,
            location: `Location in request: ${e.loc.join(' > ')}`
          }));
        message = (
          <>
            {api422response.map(a => (
              <>
                <p>{`${a.msg}`}</p>
                <p>{`${a.location}`}</p>
              </>
            ))}
          </>
        );
      } else {
        message = JSON.stringify(error.message);
      }
  }
  return (
    <ApplicationError
      width="max-w-full mt-2"
      error={{
        name: error.error,
        message
      }}
      showConsoleMessage
    />
  );
};
