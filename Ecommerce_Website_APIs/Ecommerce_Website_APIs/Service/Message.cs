using MimeKit;

namespace Ecommerce_Website_APIs.Service
{
    public class Message
    {
        public Message(MailboxAddress? to, string? subject, string? content)
        {
            To = to;
            Subject = subject;
            Content = content;
        }

        public MailboxAddress? To { get; set; }
        public string? Subject { get; set; }
        public string? Content { get; set; }
    }
}
