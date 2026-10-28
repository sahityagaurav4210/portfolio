import React, { ReactNode } from 'react';
import Notes from './Notes';

export interface FormNotesProps {
  customNotes?: ReactNode[];
  showCommonNotes?: boolean;
}

export function FormNotes({ customNotes = [], showCommonNotes = true }: FormNotesProps): ReactNode {
  return (
    <div className='flex flex-col justify-center mb-4'>
      <Notes
        note={
          <p className='text-xs text-justify'>
            All fields marked with asterik <span className='text-red-500 font-bold'>(*)</span> are mandatory to fill.
          </p>
        }
      />
      {customNotes.map((note, index) => (
        <Notes key={index} note={note} />
      ))}
      {showCommonNotes && (
        <>
          <Notes
            note={
              <p className='text-xs text-justify'>You will be contacted within 48 hours after filling up this form.</p>
            }
          />
          <Notes
            note={
              <p className='text-xs text-justify'>
                Please provide a valid email address as it would be used for further communication purposes.
              </p>
            }
          />
        </>
      )}
    </div>
  );
}

const MemoizedFormNotes = React.memo(FormNotes);
export default MemoizedFormNotes;
