using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using work_01_MasterDetails_API.Models;

[Route("api/[controller]")]
[ApiController]
public class SkillsController : ControllerBase
{
    private readonly CandidateDbContext _context;
    public SkillsController(CandidateDbContext context)
    {
        _context = context;
    }

    // GET: api/Skill
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Skill>>> GetSkill()
    {
        return await _context.Skills.ToListAsync();
    }

    // GET: api/Skill/5
    [HttpGet("{skillid}")]
    public async Task<ActionResult<Skill>> GetSkill(int skillid)
    {
        var skill = await _context.Skills.FindAsync(skillid);

        if (skill == null)
        {
            return NotFound();
        }

        return skill;
    }

    // PUT: api/Skill/5

    [HttpPut("{skillid}")]
    public async Task<IActionResult> PutSkill(int? skillid, Skill skill)
    {
        if (skillid != skill.SkillId)
        {
            return BadRequest();
        }

        _context.Entry(skill).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!SkillExists(skillid))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/Skill

    [HttpPost]
    public async Task<ActionResult<Skill>> PostSkill(Skill skill)
    {
        _context.Skills.Add(skill);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetSkill", new { skillid = skill.SkillId }, skill);
    }

    // DELETE: api/Skill/5
    [HttpDelete("{skillid}")]
    public async Task<IActionResult> DeleteSkill(int? skillid)
    {
        var skill = await _context.Skills.FindAsync(skillid);
        if (skill == null)
        {
            return NotFound();
        }

        _context.Skills.Remove(skill);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SkillExists(int? skillid)
    {
        return _context.Skills.Any(e => e.SkillId == skillid);
    }
}
