const people = [
  {
    name: 'Digimantra Labs',
    title: 'Associate Web Developer',
    department: 'Backend development',
    duration: 'Aug 2022 - Nov 2023',
    email: 'sahityagaurav.41125@gmail.com',
    role: 'Backend Developer',
    image: 'https://th.bing.com/th/id/OIP.8pEq4f2V2iE4h96Rmo6uygAAAA?w=154&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
  },
  {
    name: 'Creative Line International Pvt Ltd',
    title: 'Software Developer',
    department: 'Software development',
    duration: 'Dec 2023 - Mar 2024',
    email: 'sahityagaurav.41125@gmail.com',
    role: 'Software Developer',
    image:
      'https://th.bing.com/th?q=Factory+Clip+Art&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
  },
  {
    name: 'Rocky Mountain Technologies India Pvt Ltd',
    title: 'Backend Developer',
    department: 'Backend development',
    duration: 'Apr 2024 - Present',
    email: 'sahityagaurav.41125@gmail.com',
    role: 'Backend Developer',
    image:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsJCQcJCQcJCQkJCwkJCQkJCQsJCwsMCwsLDA0QDBEODQ4MEhkSJRodJR0ZHxwpKRYlNzU2GioyPi0pMBk7IRP/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAEOAQADASIAAhEBAxEB/8QAHAABAAMBAQEBAQAAAAAAAAAAAAUGBwQDAQII/8QATxAAAQQCAAQCBQcFCgsJAAAAAQACAwQFEQYSEyExQRQiUWFxBxUjQoGU0jIzVFWRFhckNVJicnOSsjQ2Q6Gxs7TR0+HxRFN0dYKDk6LB/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAECAwQFBv/EADARAQACAQIEBQIEBwEAAAAAAAABAgMRIQQSMUEFEyJRYRSBUpGxwSMyQnGh0fDh/9oADAMBAAIRAxEAPwDW0REBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERARVHjXifJcNR4h9KCpKbklpknpQlIaImsI5em9vt7ql/vpcS/oGI/sWv8AjLWmG941gbEix399LiX9AxH9i1/xl9/fS4l86GI15gNtA/t6qv8ATZPY1bCizTHfKnWe5jMrjJIWnfNPSl6zR7zDIGu18HH4LQaOQx+SrRXKFmKxWl3ySRHY2PFrge4I8wQCFlfHan80DqRV7i7O2uHcVHfrQQzyOuQVuSdz2tDZGvcTtnffZU/98TiqGCrft8NBuNnLDHYBsxxzB423pzOa5mz5bCmuO1o1gaiigjxRhG4CHiKSSRtGaJr428oM75S4s9Hazei/YIPfXYnehsUg/KNxXb69jF8OtkowuIe/o3rXJrxD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OtFFJyb5eqxr9b9nMF+GU6Ubg+OtXY8b05kUbXDfY6IG10Ip1lSaVmdZjd80vgaBvQA346H2L9IoXeckMMzeSWOORu+blkYHjY89OGl4+gY79Dq//BF+FdSKdZhSaVnrDmlo4+xCyvPUqzV2FrmwzQxvia5u9EMcC3t312XN8w8N/qbE/ca34FJImsr6aI35h4b/AFNifuNX8CfMPDn6mxP3Gr+BSSJrIjfmHhv9TYn7jV/AnzDw3+psT9xrfgUkiayI35h4b/U2J+41vwJ8w8N/qbE/cav4FJImsiN+YeG/1NifuNX8C9I8RhYQRFjcfGCdkR1IGAnw3prV3ImsqzWLbS5Pm3F/oNP7vF+FPm3F/oNP7vF+FdaKeafdTycf4Y/JyfNuK/QaX3eL8KfNuK86NM/GvF+FdaKOaTysf4Ycnzbi+38Bp/d4vwp83Yv9Bp/d4vwrrRNZT5WP8Mfk5Pm3Fj/sNP7vF+Fe0NetXDhBDFE1x24RRtYCfDZDQF6omsymMdKzrECIihcREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/2Q==',
  },
];

function Experience() {
  return (
    <>
      <div className="bg-slate-50">
        <h1 className='text-4xl p-4 font-bold font-cookie tracking-wider'>Experience</h1>
        <section className='container mx-auto px-4 py-4'>
          <div className='mt-6 flex flex-col'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th scope='col' className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>
                          <span>Company</span>
                        </th>
                        <th scope='col' className='px-12 py-3.5 text-left text-sm font-normal text-gray-700'>
                          Title
                        </th>

                        <th scope='col' className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>
                          Duration
                        </th>

                        <th scope='col' className='px-4 py-3.5 text-left text-sm font-normal text-gray-700'>
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                      {people.map((person) => (
                        <tr key={person.name}>
                          <td className='whitespace-nowrap px-4 py-4'>
                            <div className='flex items-center'>
                              <div className='h-10 w-10 flex-shrink-0'>
                                <img className='h-10 w-10 rounded-full object-cover' src={person.image} alt='' />
                              </div>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>{person.name}</div>
                                <div className='text-sm text-gray-700'>{person.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-12 py-4'>
                            <div className='text-sm text-gray-900 '>{person.title}</div>
                            <div className='text-sm text-gray-700'>{person.department}</div>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4'>
                            <span className='inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800'>
                              {person.duration}
                            </span>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm text-gray-700'>{person.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Experience;
