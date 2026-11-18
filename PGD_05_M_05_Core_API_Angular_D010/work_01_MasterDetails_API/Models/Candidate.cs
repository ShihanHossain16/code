using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace work_01_MasterDetails_API.Models
{
    public class Candidate
    {
        public int CandidateId { get; set; }
        [Required,StringLength(50)]
        public string CandidateName { get; set; } = default!;
        [Column(TypeName ="date")]
        public DateTime BirthDate { get; set; }
        [StringLength(50)]
        public string PhoneNo { get; set; } = default!;
        [StringLength(150)]
        public string Picture { get; set; } = default!;
        public bool Fresher { get; set; }
        public virtual ICollection<CandidateSkill> CandidateSkills { get; set; } = new List<CandidateSkill>();
    }
}
