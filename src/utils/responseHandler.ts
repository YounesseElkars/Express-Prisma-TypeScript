/*

Types :

- 

[* ] sendNotFoundResponse <Message>
      return response.status(HttpStatusCode.NOT_FOUND).json({
        status: 'Error',
        message: 'Credentials Error (user)',
      });

[* ] sendSuccessResponse <Message ,  Object , StatusCode >
        return response.status(HttpStatusCode.OK).json({
        result: 'Login Successful',
        fullName: user.fullName,
        email: user.email,
      });

[* ] sendNotFoundResponse <Message>
            return response.status(HttpStatusCode.NOT_FOUND).json({
        status: 'Error',
        message: 'Credentials Error (password)',
      });

          return response.status(HttpStatusCode.OK).json({
      message: 'User logged out',
    });

        return response.status(HttpStatusCode.OK).json(authors);

            return response.status(HttpStatusCode.CREATED).json(newAuthor);

                return response.status(HttpStatusCode.OK).json(updatedAuthor);

                    return response.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Author has been deleted',
    });



          return response.status(HttpStatusCode.NOT_FOUND).json({
        status: 'Error',
        message: 'Author Not Found',
      });


          return response.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(res);



*/
