using MailKit.Net.Smtp;
using MimeKit;

namespace Ecommerce_Website_APIs.Service
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public MimeMessage CreateEmail(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.To.Add(message.To);
            emailMessage.From.Add(new MailboxAddress("email", _configuration.GetSection("EmailConfig:From").Value!));
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart("plain") { Text = message.Content };

            return emailMessage;
        }

        public async Task Send(Message message)
        {
            var email = CreateEmail(message);
            await SendEmail(email);
        }

        public async Task SendEmail(MimeMessage message)
        {
            var smtp = new SmtpClient();
            try
            {
                await smtp.ConnectAsync(_configuration.GetSection("EmailConfig:Smtp").Value!, Convert.ToInt32(_configuration.GetSection("EmailConfig:Port").Value!), true);

                await smtp.AuthenticateAsync(_configuration.GetSection("EmailConfig:Username").Value!, _configuration.GetSection("EmailConfig:Password").Value!);

                await smtp.SendAsync(message);
            }
            catch
            {

                throw;
            }
            finally
            {
                await smtp.DisconnectAsync(true);
                smtp.Dispose();
            }
        }
    }
}
