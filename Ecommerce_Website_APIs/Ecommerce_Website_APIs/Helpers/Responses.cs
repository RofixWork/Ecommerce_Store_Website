namespace Ecommerce_Website_APIs.Helpers
{
    public static class Responses
    {
        //bad resposne
        public static object BadRequestResponse(string[] errors)
        {
            return new
            {
                status = StatusCodes.Status400BadRequest,
                errors = errors.ToArray()
            };
        }

        //bad resposne
        public static object NotFoundResponse(string[] errors)
        {
            return new
            {
                status = StatusCodes.Status404NotFound,
                errors = errors.ToArray()
            };
        }

        //success response
        public static object OkResponse(object message)
        {
            return new
            {
                status = StatusCodes.Status200OK,
                message
            };
        }
    }
}
