using System.ComponentModel.DataAnnotations;

namespace SE_Project.Models
{
    public class Students
    {
        [Required(ErrorMessage = "The Name field is required.")]
        public int Id { get; set; }


        [Required(ErrorMessage = "The Name field is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "The Password field is required.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "The Email field is required.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "The Roll No field is required.")]
        public string RollNo { get; set; }
        public string gmail { get; set; }
    }
}
