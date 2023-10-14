using MimeKit;

namespace Ecommerce_Website_APIs.Service
{
    public interface IEmailSender
    {
        MimeMessage CreateEmail(Message message);
        Task SendEmail(MimeMessage message);
        Task Send(Message message);
    }
}
